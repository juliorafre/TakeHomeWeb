import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
	threshold?: number;
	rootMargin?: string;
	triggerOnce?: boolean;
}

export const useIntersectionObserver = ({
	threshold = 0.1,
	rootMargin = "200px",
	triggerOnce = true,
}: UseIntersectionObserverOptions = {}
) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const targetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const target = targetRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const isVisible = entry.isIntersecting;
				setIsIntersecting(isVisible);

				// If triggerOnce is true, stop observing after first intersection
				if (isVisible && triggerOnce && target) {
					observer.unobserve(target);
				}
			},
			{
				threshold,
				rootMargin,
			}
		);

		observer.observe(target);

		return () => {
			if (target) {
				observer.unobserve(target);
			}
		};
	}, [threshold, rootMargin, triggerOnce]);

	return { ref: targetRef, isIntersecting };
};
