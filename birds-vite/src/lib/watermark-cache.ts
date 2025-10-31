const CACHE_NAME = "watermarked-birds-v1";
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CacheMetadata {
	timestamp: number;
	originalUrl: string;
}

/* Manual handling of cache size limits */
const clearOldestEntries = async (count = 10) => {
	const cache = await caches.open(CACHE_NAME);
	const keys = await cache.keys();

	for (let i = 0; i < Math.min(count, keys.length); i++) {
		await cache.delete(keys[i]);
	}
};

export const getCachedWatermark = async (
	imageURL: string,
): Promise<string | null> => {
	try {
		const cache = await caches.open(CACHE_NAME);
		const response = await cache.match(imageURL);

		if (!response) {
			return null;
		}

		const metadata = response.headers.get("x-cache-metadata");
		if (metadata) {
			const { timestamp }: CacheMetadata = JSON.parse(metadata);
			const age = Date.now() - timestamp;

			if (age > CACHE_EXPIRY_MS) {
				await cache.delete(imageURL);
				return null;
			}
		}

		const blob = await response.blob();
		return URL.createObjectURL(blob);
	} catch (error) {
		/* For TakeHome purpose. In other case I use a external service to log*/
		console.error("Error reading from cache:", error);
		return null;
	}
};

export const clearWatermarkCache = async (): Promise<void> => {
	try {
		await caches.delete(CACHE_NAME);
	} catch (error) {
		console.error("Error clearing cache:", error);
	}
};

export const cacheWatermark = async (
	imageURL: string,
	blob: Blob,
): Promise<void> => {
	try {
		const cache = await caches.open(CACHE_NAME);

		const metadata: CacheMetadata = {
			timestamp: Date.now(),
			originalUrl: imageURL,
		};

		// Create a Response with custom headers for metadata
		const response = new Response(blob, {
			headers: {
				"Content-Type": "image/jpeg",
				"x-cache-metadata": JSON.stringify(metadata),
			},
		});

		await cache.put(imageURL, response);
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes("QuotaExceededError")
		) {
			try {
				await clearOldestEntries();
				const response = new Response(blob, {
					headers: {
						"Content-Type": "image/jpeg",
						"x-cache-metadata": JSON.stringify({
							timestamp: Date.now(),
							originalUrl: imageURL,
						}),
					},
				});
				const cache = await caches.open(CACHE_NAME);
				await cache.put(imageURL, response);
			} catch (retryError) {
				/* For TakeHome purpose. In other case I use a external service to log */
				console.error("Error caching watermarked image:", retryError);
			}
		} else {
			/* For TakeHome purpose. In other case I use a external service to log */
			console.error("Error caching watermarked image:", error);
		}
	}
};
