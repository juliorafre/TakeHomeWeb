import { useParams } from "react-router";
import ErrorHandler from "@/components/error-handler";
import Notes from "@/components/notes";
import { Skeleton } from "@/components/skeletons/skeleton";
import { useNotesDialog } from "@/contexts/notes-dialog-context";
import { useBirdById } from "@/hooks/use-bird-by-id";
import BirdNameInLanguage from "./bird-name-in-language";
import DialogNotes from "./dialog-notes";
import LazyImage from "./lazy-image";

const BirdPageDetail = () => {
	const { birdId } = useParams();
	const { isOpen, closeDialog } = useNotesDialog();
	const { bird, birdNotes, loading, error, refetch } = useBirdById({
		birdId: birdId as string,
	});

	if (error) {
		return (
			<ErrorHandler
				error={error}
				onRetry={refetch}
				graphqlErrorMessage="We are experiencing issues fetching bird data."
				networkErrorMessage="Network error:"
			/>
		);
	}

	return (
		<div className="flex flex-col space-y-2 pt-6">
			<section className="px-6 grid grid-cols-1 md:grid-cols-3  gap-x-3">
				{loading ? (
					<Skeleton className="w-full aspect-video rounded-xl" />
				) : (
					<LazyImage src={bird?.image_url} alt={bird?.english_name || "bird"} />
				)}
			</section>

			<section className="w-full px-6">
				<div className=" pb-3 pt-5">
					{/*  TODO / Observation - This values are so specific */}
					<h3 className="font-bold text-[22px] leading-[27.5px]">Notes</h3>
				</div>
				<Notes notes={birdNotes} loading={loading} imageUrl={bird?.image_url} />
			</section>

			<section className="w-full px-6">
				{/* Static implementation fot the TakeHome */}
				<div className="pb-3 pt-5">
					{/* TODO / Observation - This values are so specific  */}
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
