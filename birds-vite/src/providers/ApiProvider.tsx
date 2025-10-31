import { ApolloProvider } from "@apollo/client/react";
import type { PropsWithChildren } from "react";
import { client } from "@/graphql/client";

const ApiProvider = ({ children }: PropsWithChildren) => (
	<ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApiProvider;
