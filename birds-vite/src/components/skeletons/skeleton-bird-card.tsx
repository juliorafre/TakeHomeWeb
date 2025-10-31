import { Skeleton } from "@/components/skeletons/skeleton";

const SkeletonBirdCard = () => {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="w-full aspect-video rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	);
};

export default SkeletonBirdCard;
