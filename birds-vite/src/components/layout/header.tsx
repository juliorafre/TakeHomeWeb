import { NavLink, useLocation, useSearchParams } from "react-router";
import Button from "@/components/button";
import { useNotesDialog } from "@/context/notes-dialog-context";
import { cn } from "@/lib/utils";

const Header = () => {
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const birdName = searchParams.get("name");
	const isBirdPageDetail = location.pathname.startsWith("/bird/");
	const { openDialog } = useNotesDialog();

	return (
		<div className="w-full py-4 px-6 flex justify-between border-b border-border sticky top-0 bg-background z-10">
			<div className="inline-flex gap-x-2">
				<NavLink
					to="/"
					className={({ isActive }) => {
						return cn(
							"leading-10 tracking-[-0.8px] font-bold",
							isActive
								? "text-foreground text-header"
								: "text-muted-foreground text-header",
						);
					}}
				>
					Birds {birdName ? "/" : ""}
				</NavLink>
				{isBirdPageDetail && (
					<h2 className=" leading-10 tracking-[-0.8px] font-bold text-header">
						{birdName}
					</h2>
				)}
			</div>
			{isBirdPageDetail && (
				<Button type="button" onClick={openDialog} variant="outline">
					Add Note
				</Button>
			)}
		</div>
	);
};

export default Header;
