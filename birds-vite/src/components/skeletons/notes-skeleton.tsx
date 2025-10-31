import { Skeleton } from "@/components/skeletons/skeleton";

const NotesSkeleton = () => {
	return (
		<div className="py-3">
			{[1, 2, 3].map((item) => (
				<div
					key={item}
					className="flex items-center gap-x-4 my-2 animate-pulse"
				>
					<Skeleton className="size-14 rounded-lg" />
					<div className="flex flex-col gap-y-1">
						<Skeleton className="w-32 h-4 rounded-sm" />
						<Skeleton className="w-48 h-3 rounded-sm" />
					</div>
				</div>
			))}
		</div>
	);
};

export default NotesSkeleton;
