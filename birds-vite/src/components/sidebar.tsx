import { NavLink } from "react-router";
import { cn } from "@/lib/utils";

const Sidebar = () => {
	return (
		<aside className="p-4 space-y-4 bg-sidebar max-h-dvh sticky top-0">
			<section className="space-y-3">
				<h1 className="m-0 leading-6 tracking-normal font-medium">
					The Bird App
				</h1>
				<h6 className="text-sm text-accent-foreground leading-5">By Copilot</h6>
			</section>
			<nav>
				<NavLink
					to="/"
					className={({ isActive }) => {
						return cn(
							"py-2 px-3 w-full cursor-pointer hover:bg-accent-foreground/20 transition-colors duration-150 ease-out rounded-xl flex justify-start items-center bg-accent-foreground/8 text-sm/6 font-semibold clickeable",
							isActive ? "font-semibold" : "",
						);
					}}
					aria-label="Go home"
				>
					Home
				</NavLink>
			</nav>
		</aside>
	);
};

export default Sidebar;
