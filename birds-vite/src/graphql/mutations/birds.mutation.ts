import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
	AddNoteMutationResponse,
	AddNoteMutationVariables,
} from "../schemas/Bird";

export const ADD_NOTE_MUTATION: TypedDocumentNode<
	AddNoteMutationResponse,
	AddNoteMutationVariables
> = gql`
	mutation AddNote($birdId: ID!, $comment: String!, $timestamp: Int!) {
		addNote(birdId: $birdId, comment: $comment, timestamp: $timestamp)
	}
`;
