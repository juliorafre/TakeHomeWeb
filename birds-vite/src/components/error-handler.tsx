import { CombinedGraphQLErrors } from "@apollo/client";
import Button from "@/components/button";

interface ErrorHandlerProps {
	error: Error;
	onRetry?: () => void;
	graphqlErrorMessage?: string;
	networkErrorMessage?: string;
}

const ErrorHandler = ({
	error,
	onRetry,
	graphqlErrorMessage = "We are experiencing issues. Please try again.",
	networkErrorMessage = "Network error occurred.",
}: ErrorHandlerProps) => {
	const isGraphQLError = CombinedGraphQLErrors.is(error);
	const errorMessage = isGraphQLError
		? graphqlErrorMessage
		: `${networkErrorMessage} ${error.message}`;

	return (
		<div className="p-6 size-full flex flex-col gap-y-2 items-center justify-center">
			<p className="text-center">{errorMessage}</p>
			{onRetry && <Button onClick={onRetry}>Retry</Button>}
		</div>
	);
};

export default ErrorHandler;
