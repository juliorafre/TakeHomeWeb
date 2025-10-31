import { Outlet } from "react-router";
import Header from "@/components/layout/header";
import Layout from "@/components/layout/layout";
import Sidebar from "@/components/sidebar";

const PageLayout = () => {
	return (
		<Layout>
			<Sidebar />
			<div className="flex flex-col ">
				<Header />
				<Outlet />
			</div>
		</Layout>
	);
};

export default PageLayout;
