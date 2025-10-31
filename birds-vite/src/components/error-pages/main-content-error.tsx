import type { FallbackProps } from "react-error-boundary";
import Button from "@/components/button";

const MainContentError = ({ error, resetErrorBoundary }: FallbackProps) => {
	return (
		<div className="size-full flex flex-col gap-y-2 items-center justify-center">
			<p>Something went wrong while loading the main content.</p>
			<p>{error.message}</p>
			<Button variant={"outline"} onClick={resetErrorBoundary}>
				Try again
			</Button>
		</div>
	);
};

export default MainContentError;
