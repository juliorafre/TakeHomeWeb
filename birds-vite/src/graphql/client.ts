import {
	ApolloClient,
	ApolloLink,
	CombinedGraphQLErrors,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";


const errorLink = new ErrorLink(({ error }) => {
	if (CombinedGraphQLErrors.is(error)) {
		/* This error manage is for TakeHome purpose. On a real production code. I manage error here and send to external logging service */
		error.errors.forEach(({ message, locations, path }) =>
			
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		);
	} else {
		console.error("[Network error]:", error);
	}
});

const httpLink = new HttpLink({
	uri: "/api/graphql",
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
	},
});

export const client = new ApolloClient({
	link: ApolloLink.from([errorLink, httpLink]),
	cache: new InMemoryCache(),
});
