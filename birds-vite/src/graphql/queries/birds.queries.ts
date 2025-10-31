import { gql, type TypedDocumentNode } from "@apollo/client";
import type { GetAllBirdsQueryGql, GetAllBirdsVariables, GetBirdByIDQueryGql, GetBirdByIDQueryGqlVariables, GetBirdNotes } from "../schemas/Bird";

export const GET_ALL_BIRDS: TypedDocumentNode<GetAllBirdsQueryGql, GetAllBirdsVariables> = gql`
  query GetAllBirds {
		birds {
			id
			english_name
			latin_name
			thumb_url
      image_url
		}
	}
`;

export const GET_BIRD_BY_ID: TypedDocumentNode<GetBirdByIDQueryGql, GetBirdByIDQueryGqlVariables> = gql`
  query GetBirdById($id: ID!) {
    bird(id: $id) {
      id
      english_name
      latin_name
      image_url
      notes {
        id
        comment
        timestamp
      }
    }
  }
`;

export const GET_BIRD_NOTES: TypedDocumentNode<GetBirdNotes, GetBirdByIDQueryGqlVariables> = gql`
  query GetBirdNotes($id: ID!) {
    bird(id: $id) {
      notes {
        id
        comment
        timestamp
      }
    }
  }
`;