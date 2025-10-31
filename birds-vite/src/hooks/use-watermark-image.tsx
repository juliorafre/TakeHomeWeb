import { useCallback, useEffect, useRef, useState } from "react";
import { WATERMARK_URL } from "@/lib/config";
import { cacheWatermark, getCachedWatermark } from "@/lib/watermark-cache";

const PLACEHOLDER =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3C/svg%3E";

const FETCH_TIMEOUT_MS = 30000; // 30 seconds

interface useWatermarkImageProps {
	imageURL: string | undefined;
}

export const useWatermarkImage = ({ imageURL }: useWatermarkImageProps) => {
	const [watermarkedUrl, setWatermarkedUrl] = useState<string>(PLACEHOLDER);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const objectUrlRef = useRef<string | null>(null);
	const imageAbortControllerRef = useRef<AbortController | null>(null);
	const watermarkAbortControllerRef = useRef<AbortController | null>(null);
	const imageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const watermarkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const fetchAndWatermark = useCallback(async () => {
		// Early return if imageURL is undefined
		if (!imageURL) {
			setWatermarkedUrl(PLACEHOLDER);
			setIsLoading(false);
			setError(new Error("Image URL is required"));
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			// Step 1: Check cache first
			const cachedUrl = await getCachedWatermark(imageURL);

			if (cachedUrl) {
				if (objectUrlRef.current) {
					URL.revokeObjectURL(objectUrlRef.current);
				}
				objectUrlRef.current = cachedUrl;
				setWatermarkedUrl(cachedUrl);
				setIsLoading(false);
				return;
			}

			// Cache miss - Clean up any previous abort controllers and timeouts
			if (imageAbortControllerRef.current) {
				imageAbortControllerRef.current.abort();
			}
			if (watermarkAbortControllerRef.current) {
				watermarkAbortControllerRef.current.abort();
			}
			if (imageTimeoutRef.current) {
				clearTimeout(imageTimeoutRef.current);
			}
			if (watermarkTimeoutRef.current) {
				clearTimeout(watermarkTimeoutRef.current);
			}

			// Step 2: Fetch the original image with its own abort controller
			const imageAbortController = new AbortController();
			imageAbortControllerRef.current = imageAbortController;

			imageTimeoutRef.current = setTimeout(() => {
				imageAbortController.abort();
			}, FETCH_TIMEOUT_MS);

			const imageResponse = await fetch(imageURL, {
				signal: imageAbortController.signal,
			});

			if (!imageResponse.ok) {
				throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
			}

			const imageBuffer = await imageResponse.arrayBuffer();

			// Clear image timeout after successful download
			if (imageTimeoutRef.current) {
				clearTimeout(imageTimeoutRef.current);
				imageTimeoutRef.current = null;
			}

			// Step 3: watermark API with abort controller
			const watermarkAbortController = new AbortController();
			watermarkAbortControllerRef.current = watermarkAbortController;

			watermarkTimeoutRef.current = setTimeout(() => {
				watermarkAbortController.abort();
			}, FETCH_TIMEOUT_MS);

			const watermarkResponse = await fetch(WATERMARK_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/octet-stream",
				},
				body: imageBuffer,
				signal: watermarkAbortController.signal,
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
			// Handle abort errors gracefully
			if (err instanceof Error && err.name === "AbortError") {
				setError(new Error("Request timeout: Image download took too long"));
			} else {
				setError(
					err instanceof Error ? err : new Error("Unknown error occurred"),
				);
			}
			setWatermarkedUrl(PLACEHOLDER);
		} finally {
			// Clean up both timeouts
			if (imageTimeoutRef.current) {
				clearTimeout(imageTimeoutRef.current);
				imageTimeoutRef.current = null;
			}
			if (watermarkTimeoutRef.current) {
				clearTimeout(watermarkTimeoutRef.current);
				watermarkTimeoutRef.current = null;
			}
			setIsLoading(false);
		}
	}, [imageURL]);

	useEffect(() => {
		return () => {
			// Abort any pending requests
			if (imageAbortControllerRef.current) {
				imageAbortControllerRef.current.abort();
			}
			if (watermarkAbortControllerRef.current) {
				watermarkAbortControllerRef.current.abort();
			}
			// Clear timeouts
			if (imageTimeoutRef.current) {
				clearTimeout(imageTimeoutRef.current);
			}
			if (watermarkTimeoutRef.current) {
				clearTimeout(watermarkTimeoutRef.current);
			}
			// Revoke object URL
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
