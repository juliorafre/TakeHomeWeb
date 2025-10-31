import { Route, Routes } from "react-router";
import BirdPageDetail from "./components/bird-page-detail";
import MainContent from "./components/layout/main-content";
import PageLayout from "./components/page-layout";

const App = () => {
	return (
		<Routes>
			<Route element={<PageLayout />}>
				<Route index element={<MainContent />} />
				<Route path="/bird/:birdId" element={<BirdPageDetail />} />
			</Route>
		</Routes>
	);
};

export default App;
