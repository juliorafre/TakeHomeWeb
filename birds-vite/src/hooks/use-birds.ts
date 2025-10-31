import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { GET_ALL_BIRDS } from "@/graphql/queries/birds.queries";
import type { GetAllBirdsQueryGql } from "@/graphql/schemas/Bird";

interface UseBirdsReturn {
	birds: GetAllBirdsQueryGql["birds"];
	loading: boolean;
	error: Error | undefined;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	filteredBirds: GetAllBirdsQueryGql["birds"];
}

export const useBirds = (): UseBirdsReturn => {
	const { loading, error, data } = useQuery(GET_ALL_BIRDS);
	const [searchQuery, setSearchQuery] = useState("");

	const birds = useMemo(() => data?.birds || [], [data?.birds]);

	const filteredBirds = useMemo(() => {
		if (!searchQuery.trim()) {
			return birds;
		}

		const query = searchQuery.toLowerCase().trim();

		return birds.filter((bird) => {
			const englishName = bird.english_name.toLowerCase();
			const latinName = bird.latin_name.toLowerCase();

			return englishName.includes(query) || latinName.includes(query);
		});
	}, [birds, searchQuery]);

	return {
		birds,
		loading,
		error: error as Error | undefined,
		searchQuery,
		setSearchQuery,
		filteredBirds,
	};
};
