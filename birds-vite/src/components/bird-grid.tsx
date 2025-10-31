import type { GetAllBirdsQuery } from "@/graphql/schemas/Bird";
import BirdCard from "./bird-card";
import SkeletonBirdCard from "./skeleton-bird-card";

interface BirdsGridProps {
	birds: GetAllBirdsQuery[];
	loading: boolean;
	error: Error | undefined;
}

const BirdsGrid = ({ birds, loading, error }: BirdsGridProps) => {
	if (loading) {
		return (
			<div className="p-6 grid grid-cols-4 gap-6">
				<SkeletonBirdCard />
				<SkeletonBirdCard />
				<SkeletonBirdCard />
				<SkeletonBirdCard />
				<SkeletonBirdCard />
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6">
				<p>Error: {error.message}</p>
			</div>
		);
	}

	return (
		<ul className="grid grid-cols-4 gap-6 p-6">
			{birds.map((bird) => (
				<BirdCard key={bird.id} bird={bird} />
			))}
		</ul>
	);
};

export default BirdsGrid;
