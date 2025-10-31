const CACHE_NAME = 'watermarked-birds-v1';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CacheMetadata {
	timestamp: number;
	originalUrl: string;
}

/**
 * Checks if a watermarked image exists in the cache and is still valid
 * Returns a blob URL if found, null otherwise
 */
export const getCachedWatermark = async (
	imageURL: string,
): Promise<string | null> => {
	try {
		const cache = await caches.open(CACHE_NAME);
		const response = await cache.match(imageURL);

		if (!response) {
			return null;
		}

		// Check if cache entry has expired
		const metadata = response.headers.get('x-cache-metadata');
		if (metadata) {
			const { timestamp }: CacheMetadata = JSON.parse(metadata);
			const age = Date.now() - timestamp;

			if (age > CACHE_EXPIRY_MS) {
				// Cache expired, remove it
				await cache.delete(imageURL);
				return null;
			}
		}

		const blob = await response.blob();
		return URL.createObjectURL(blob);
	} catch (error) {
		console.error('Error reading from cache:', error);
		return null;
	}
};

/**
 * Stores a watermarked image blob in the cache with metadata
 */
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
				'Content-Type': 'image/jpeg',
				'x-cache-metadata': JSON.stringify(metadata),
			},
		});

		await cache.put(imageURL, response);
	} catch (error) {
		console.error('Error caching watermarked image:', error);
		// Don't throw - caching is an enhancement, not critical
	}
};

/**
 * Clears all cached watermarked images
 */
export const clearWatermarkCache = async (): Promise<void> => {
	try {
		await caches.delete(CACHE_NAME);
	} catch (error) {
		console.error('Error clearing cache:', error);
	}
};

/**
 * Gets cache statistics (count and total size in bytes)
 */
export const getCacheStats = async (): Promise<{
	count: number;
	size: number;
}> => {
	try {
		const cache = await caches.open(CACHE_NAME);
		const keys = await cache.keys();
		let totalSize = 0;

		for (const request of keys) {
			const response = await cache.match(request);
			if (response) {
				const blob = await response.blob();
				totalSize += blob.size;
			}
		}

		return {
			count: keys.length,
			size: totalSize,
		};
	} catch (error) {
		console.error('Error getting cache stats:', error);
		return { count: 0, size: 0 };
	}
};
