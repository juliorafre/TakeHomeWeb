import BirdsGrid from "@/components/bird-grid";
import DebounceSearch from "@/components/inputs/debounce-search";
import { useBirds } from "@/hooks/use-birds";

const MainContent = () => {
	const { filteredBirds, loading, error, setSearchQuery } = useBirds();

	return (
		<div className="divide-y divide-border">
			<DebounceSearch onSearch={setSearchQuery} />
			<BirdsGrid birds={filteredBirds} loading={loading} error={error} />
		</div>
	);
};

export default MainContent;
