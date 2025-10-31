import SkeletonBirdCard from "@/components/skeletons/skeleton-bird-card";

const BirdGridSkeleton = () => {
	return (
		<div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			<SkeletonBirdCard />
			<SkeletonBirdCard />
			<SkeletonBirdCard />
			<SkeletonBirdCard />
			<SkeletonBirdCard />
		</div>
	);
};
export default BirdGridSkeleton;
