import { type ApolloError, useMutation } from "@apollo/client";
import { toast } from "sonner";
import { ADD_NOTE_MUTATION } from "@/graphql/mutations/birds.mutation";
import { GET_BIRD_BY_ID } from "@/graphql/queries/birds.queries";
import type {
	AddNoteMutationResponse,
	AddNoteMutationVariables,
} from "@/graphql/schemas/Bird";

interface UseCreateNoteReturn {
	createNote: (data: AddNoteMutationVariables) => void;
	loading: boolean;
	error: ApolloError | undefined;
	data: AddNoteMutationResponse | undefined;
	reset: () => void;
}

const useCreateNotes = (): UseCreateNoteReturn => {
	const [mutate, { data, loading, error, reset: resetMutation }] = useMutation(
		ADD_NOTE_MUTATION,
		{
			update(cache, { data }, { variables }) {
				const addNote = data?.addNote;
				if (!addNote) {
					// This is only for this TakeHome challenge purpose. On a real app, I use an external logging service.
					console.warn(
						"No note ID returned from mutation, skipping cache update.",
					);
					return;
				}

				if (!variables) {
					// This is only for this TakeHome challenge purpose. On a real app, I use an external logging service.
					console.warn(
						"No variables provided for mutation, skipping cache update.",
					);
					return;
				}

				const existingBird = cache.readQuery({
					query: GET_BIRD_BY_ID,
					variables: { id: variables.birdId },
				});

				if (existingBird) {
					cache.writeQuery({
						query: GET_BIRD_BY_ID,
						variables: { id: variables.birdId },
						data: {
							bird: {
								...existingBird.bird,
								notes: [
									...existingBird.bird.notes,
									{
										id: addNote,
										comment: variables.comment,
										timestamp: variables.timestamp,
										__typename: "Note",
									},
								],
							},
						},
					});
				}
			},
			onCompleted() {
				toast.success("Note added successfully!");
			},
		},
	);

	const createNote = (note: AddNoteMutationVariables) => {
		mutate({
			variables: {
				birdId: note.birdId,
				comment: note.comment,
				timestamp: Math.floor(Date.now() / 1000),
			},
		});
	};

	const reset = () => {
		resetMutation();
	};

	return {
		createNote,
		loading,
		error,
		data: data ?? undefined,
		reset,
	};
};

export default useCreateNotes;
