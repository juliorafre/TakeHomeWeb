import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";

export const typeDefs = gql`
  extend type Bird {
    watermarkedImage: String
  }
`;

export const client = new ApolloClient({
	link: new HttpLink({
		uri: "/api/graphql",
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
		},
	}),
	cache: new InMemoryCache(),
});
