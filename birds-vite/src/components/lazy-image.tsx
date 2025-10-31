import { LoaderCircleIcon } from "lucide-react";
import React, { useEffect } from "react";
import Button from "@/components/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useWatermarkImage } from "@/hooks/use-watermark-image";

interface LazyImageProps {
	src: string;
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
			if (isIntersecting && !hasLoaded) {
				fetchAndWatermark();
				setHasLoaded(true);
			}
		}, [isIntersecting, fetchAndWatermark, hasLoaded]);

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
				{isLoading && (
					<div className="w-full aspect-video rounded-xl bg-neutral-200 grid place-items-center">
						<LoaderCircleIcon
							size={40}
							className="animate-spin text-neutral-400"
						/>
					</div>
				)}
				<img
					src={watermarkedUrl}
					alt={alt}
					className={className}
					loading="lazy"
					style={{ display: isLoading || error ? "none" : "block" }}
				/>
			</div>
		);
	},
);

export default LazyImage;
