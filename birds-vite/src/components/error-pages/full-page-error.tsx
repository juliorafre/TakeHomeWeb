import type { FallbackProps } from "react-error-boundary";
import Button from "@/components/button";

const FullPageError = ({ resetErrorBoundary }: FallbackProps) => {
	return (
		<div className="size-full flex flex-col gap-y-2 items-center justify-center">
			<p>An unexpected error occurred. Please try again later.</p>
			<Button variant={"outline"} onClick={resetErrorBoundary}>
				Try again
			</Button>
		</div>
	);
};

export default FullPageError;
