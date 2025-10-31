import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import PageLayout from "./components/layout/page-layout";
import LoadingSuspense from "./components/loading-suspense";

const MainContent = lazy(() => import("./components/layout/main-content"));
const BirdPageDetail = lazy(() => import("./components/bird-page-detail"));

const App = () => {
	return (
		<Routes>
			<Route element={<PageLayout />}>
				<Route
					index
					element={
						<Suspense fallback={<LoadingSuspense />}>
							<MainContent />
						</Suspense>
					}
				/>
				<Route
					path="/bird/:birdId"
					element={
						<Suspense fallback={<LoadingSuspense />}>
							<BirdPageDetail />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
};

export default App;
