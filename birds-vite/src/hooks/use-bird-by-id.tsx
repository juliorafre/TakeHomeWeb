import { useQuery } from "@apollo/client";
import { GET_BIRD_BY_ID } from "@/graphql/queries/birds.queries";

interface UseBirdByIdProps {
	birdId?: string;
}

export const useBirdById = ({ birdId }: UseBirdByIdProps) => {
	const { loading, error, data } = useQuery(GET_BIRD_BY_ID, {
		variables: birdId ? { id: birdId } : undefined,
		skip: !birdId,
	});

	return {
		bird: data?.bird,
		birdNotes: data?.bird.notes || [],
		loading,
		error,
	};
};
