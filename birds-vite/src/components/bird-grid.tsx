import BirdCard from "@/components/bird-card";
import ErrorHandler from "@/components/error-handler";
import type { GetAllBirdsQuery } from "@/graphql/schemas/Bird";
import BirdGridSkeleton from "./skeletons/bird-grid-skeleton";

interface BirdsGridProps {
	birds: GetAllBirdsQuery[];
	loading: boolean;
	error: Error | undefined;
	refetch: () => void;
}

const BirdsGrid = ({ birds, loading, error, refetch }: BirdsGridProps) => {
	if (loading) {
		return <BirdGridSkeleton />;
	}

	if (error) {
		return (
			<ErrorHandler
				error={error}
				onRetry={refetch}
				graphqlErrorMessage="We are experiencing issues fetching bird data."
				networkErrorMessage="Network error:"
			/>
		);
	}

	return (
		<ul className="grid grid-cols-2  sm:grid-cols-4 gap-6 p-6">
			{birds.map((bird) => (
				<BirdCard key={bird.id} bird={bird} />
			))}
		</ul>
	);
};

export default BirdsGrid;
