import type { Bird, Note } from "@/types/bird.type";

export type Typename = string;

export type GetAllBirdsQuery = Omit<Bird, "notes"> & {
	__typename: Typename;
};
export type GetBirdByIDGql = Omit<Bird, "thumb_url"> & {
	__typename: Typename;
};
export type GetBirdNotesByIDGql = Pick<Bird, "notes"> & {
	__typename: Typename;
};

export type GetAllBirdsQueryGql = {
	birds: GetAllBirdsQuery[];
};

export type GetAllBirdsVariables = Record<string, never>;

export type GetBirdByIDQueryGql = {
	bird: GetBirdByIDGql;
};

export type GetBirdByIDQueryGqlVariables = {
	id: string;
};

export type GetBirdNotes = {
	bird: GetBirdNotesByIDGql;
};

export type AddNoteMutationResponse = {
	addNote: string; 
};

export type AddNoteMutationVariables = Omit<Note, "id"> & {
	birdId: Pick<Bird, "id">["id"];
};