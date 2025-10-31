import { useCallback, useEffect, useRef, useState } from "react";
import { WATERMARK_URL } from "@/lib/config";
import { cacheWatermark, getCachedWatermark } from "@/lib/watermark-cache";

const PLACEHOLDER =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3C/svg%3E";

interface useWatermarkImageProps {
	imageURL: string | undefined;
}

export const useWatermarkImage = ({ imageURL }: useWatermarkImageProps) => {
	const [watermarkedUrl, setWatermarkedUrl] = useState<string>(PLACEHOLDER);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const objectUrlRef = useRef<string | null>(null);

	const fetchAndWatermark = useCallback(async () => {
		// Guard: Don't attempt to fetch if imageURL is undefined or empty
		if (!imageURL) {
			setError(new Error("No image URL provided"));
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			// Step 1: Check cache first
			const cachedUrl = await getCachedWatermark(imageURL);

			if (cachedUrl) {
				// Cache hit! Use the cached watermarked image
				if (objectUrlRef.current) {
					URL.revokeObjectURL(objectUrlRef.current);
				}
				objectUrlRef.current = cachedUrl;
				setWatermarkedUrl(cachedUrl);
				setIsLoading(false);
				return;
			}

			// Step 2: Cache miss - Fetch the original image
			const imageResponse = await fetch(imageURL);

			if (!imageResponse.ok) {
				throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
			}

			const imageBuffer = await imageResponse.arrayBuffer();
			const byteLength = imageBuffer.byteLength;

			// Step 3: Send to watermark API
			const watermarkResponse = await fetch(WATERMARK_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/octet-stream",
					"Content-Length": byteLength.toString(),
				},
				body: imageBuffer, // Send the blob directly
			});

			if (!watermarkResponse.ok) {
				throw new Error(`Watermark API error: ${watermarkResponse.statusText}`);
			}

			// Step 4: Get the watermarked image as Blob
			const watermarkedBlob = await watermarkResponse.blob();

			// Step 5: Cache the watermarked image for future use
			await cacheWatermark(imageURL, watermarkedBlob);

			// Step 6: Clean up previous object URL
			if (objectUrlRef.current) {
				URL.revokeObjectURL(objectUrlRef.current);
			}

			// Step 7: Create new object URL for rendering
			const newObjectUrl = URL.createObjectURL(watermarkedBlob);
			objectUrlRef.current = newObjectUrl;
			setWatermarkedUrl(newObjectUrl);
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error("Unknown error occurred"),
			);
			setWatermarkedUrl(PLACEHOLDER);
		} finally {
			setIsLoading(false);
		}
	}, [imageURL]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (objectUrlRef.current) {
				URL.revokeObjectURL(objectUrlRef.current);
			}
		};
	}, []);

	return {
		watermarkedUrl,
		isLoading,
		error,
		fetchAndWatermark,
	};
};
