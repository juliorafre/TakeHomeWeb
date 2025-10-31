import type { ErrorLike } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { GET_BIRD_BY_ID } from "@/graphql/queries/birds.queries";
import type { GetBirdByIDQueryGql } from "@/graphql/schemas/Bird";

interface UseBirdByIdProps {
	birdId: string;
}

interface UseBirdByIdReturn {
	bird: GetBirdByIDQueryGql["bird"] | undefined;
	birdNotes: GetBirdByIDQueryGql["bird"]["notes"];
	loading: boolean;
	error: ErrorLike | undefined;
	refetch: () => void;
}

export const useBirdById = ({
	birdId,
}: UseBirdByIdProps): UseBirdByIdReturn => {
	const { loading, error, data, refetch } = useQuery(GET_BIRD_BY_ID, {
		variables: { id: birdId },
		skip: !birdId,
		errorPolicy: "all",
		notifyOnNetworkStatusChange: true,
	});

	const bird = useMemo(() => data?.bird, [data?.bird]);
	const birdNotes = useMemo(() => data?.bird?.notes || [], [data?.bird?.notes]);

	return {
		bird,
		birdNotes,
		loading,
		error,
		refetch,
	};
};
