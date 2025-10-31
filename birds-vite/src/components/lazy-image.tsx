import { LoaderCircleIcon } from "lucide-react";
import React, { useEffect } from "react";
import Button from "@/components/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useWatermarkImage } from "@/hooks/use-watermark-image";

interface LazyImageProps {
	src?: string;
	alt: string;
	className?: string;
}

const LazyImage = React.memo(
	({
		src,
		alt,
		className = "w-full aspect-video object-cover rounded-xl",
	}: LazyImageProps) => {
		const { ref, isIntersecting } = useIntersectionObserver();
		const [hasLoaded, setHasLoaded] = React.useState(false);
		const { watermarkedUrl, error, isLoading, fetchAndWatermark } =
			useWatermarkImage({
				imageURL: src,
			});

		useEffect(() => {
			if (isIntersecting && !hasLoaded && src) {
				fetchAndWatermark();
				setHasLoaded(true);
			}
		}, [isIntersecting, fetchAndWatermark, hasLoaded, src]);

		// Handle undefined or missing image source
		if (!src) {
			return (
				<div
					className={`${className} bg-neutral-200 grid place-content-center`}
				>
					<p className="text-sm text-neutral-500">Image not available</p>
				</div>
			);
		}

		return (
			<div ref={ref} className="size-auto">
				{error && (
					<div className="w-full aspect-video rounded-xl bg-neutral-200 grid place-content-center space-y-2">
						<p>{error.message}</p>
						<Button type="button" variant="outline" onClick={fetchAndWatermark}>
							Retry
						</Button>
					</div>
				)}
				{isLoading && !error && (
					<div className="w-full aspect-video rounded-xl bg-neutral-200 grid place-items-center">
						<LoaderCircleIcon
							size={40}
							className="animate-spin text-neutral-400"
						/>
					</div>
				)}
				{!isLoading && !error && (
					<img
						src={watermarkedUrl}
						alt={alt}
						className={className}
						loading="lazy"
					/>
				)}
			</div>
		);
	},
);

export default LazyImage;
