import { ErrorBoundary } from "react-error-boundary";
import BirdsGrid from "@/components/bird-grid";
import DebounceSearch from "@/components/inputs/debounce-search";
import { useBirds } from "@/hooks/use-birds";
import MainContentError from "../error-pages/main-content-error";

const MainContent = () => {
	const { filteredBirds, loading, error, setSearchQuery, refetch } = useBirds();

	return (
		<ErrorBoundary FallbackComponent={MainContentError}>
			<div className="divide-y divide-border">
				<DebounceSearch onSearch={setSearchQuery} />
				<BirdsGrid
					birds={filteredBirds}
					loading={loading}
					error={error}
					refetch={refetch}
				/>
			</div>
		</ErrorBoundary>
	);
};

export default MainContent;
