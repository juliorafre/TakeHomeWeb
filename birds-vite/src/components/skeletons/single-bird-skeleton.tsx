import { Skeleton } from "@/components/ui/skeleton";

const SingleBirdSkeleton = () => {
	return (
		<div className="flex flex-col space-y-2 pt-6">
			<section className="px-6 grid grid-cols-3 gap-x-3">
				<Skeleton className="w-full aspect-video rounded-xl" />
			</section>
			<section className="w-full px-6">
				<div className=" pb-3 pt-5">
					<h3 className="font-bold text-[22px] leading-[27.5px]">Notes</h3>
				</div>
				<div className="py-3 flex flex-col gap-2">
					<Skeleton className="w-full h-20 rounded-xl" />
					<Skeleton className="w-full h-20 rounded-xl" />
				</div>
			</section>
			<section className="w-full px-6">
				<div className="pb-3 pt-5">
					{/* TODO - This values are so differents */}
					<h3 className="font-bold text-[22px] leading-[27.5px]">
						In Other Languages
					</h3>
				</div>
				<div className="py-3">
					<div className="grid grid-cols-2 gap-x-2">
						<Skeleton className="w-full h-20 rounded-xl" />
						<Skeleton className="w-full h-20 rounded-xl" />
					</div>
				</div>
			</section>
		</div>
	);
};

export default SingleBirdSkeleton;
