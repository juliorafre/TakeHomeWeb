import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router";
import Notes from "@/components/notes";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotesDialog } from "@/context/notes-dialog-context";
import { GET_BIRD_BY_ID } from "@/graphql/queries/birds.queries";
import BirdNameInLanguage from "./bird-name-in-language";
import DialogNotes from "./dialog-notes";
import LazyImage from "./lazy-image";

//import NoteItem from "./note-item";

const BirdPageDetail = () => {
	const { birdId } = useParams();
	const { isOpen, closeDialog } = useNotesDialog();
	const { loading, error, data } = useQuery(GET_BIRD_BY_ID, {
		variables: birdId ? { id: birdId } : undefined,
		skip: !birdId,
	});

	const birdNotes = data?.bird.notes || [];

	useEffect(() => {
		console.log("Single Bird", data);
	}, [data]);

	if (error) {
		return <p>Error</p>;
	}

	return (
		<div className="flex flex-col space-y-2 pt-6">
			<section className="px-6 grid grid-cols-3 gap-x-3">
				{loading ? (
					<Skeleton className="w-full aspect-video rounded-xl" />
				) : (
					<LazyImage src={data?.bird.image_url} alt={data?.bird.english_name} />
				)}
			</section>

			<section className="w-full px-6">
				<div className=" pb-3 pt-5">
					{/*  TODO / Observation - This values are so differents */}
					<h3 className="font-bold text-[22px] leading-[27.5px]">Notes</h3>
				</div>
				<Notes
					notes={birdNotes}
					loading={loading}
					imageUrl={data?.bird.image_url}
				/>
			</section>

			<section className="w-full px-6">
				<div className="pb-3 pt-5">
					{/* TODO / Observation - This values are so differents */}
					<h3 className="font-bold text-[22px] leading-[27.5px]">
						In Other Languages
					</h3>
				</div>
				<div className="py-3">
					<div className="grid grid-cols-2">
						<BirdNameInLanguage
							language="Spanish"
							name="Pinguino de Magallanes"
						/>
						<BirdNameInLanguage
							language="Latin"
							name="Spheniscus Magellanicus"
						/>
					</div>
				</div>
			</section>
			<DialogNotes
				isOpen={isOpen}
				onCloseDialog={closeDialog}
				birdId={birdId as string}
			/>
		</div>
	);
};

export default BirdPageDetail;
