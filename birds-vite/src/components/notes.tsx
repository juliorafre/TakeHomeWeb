import type { Note } from "@/types/bird.type";
import LazyImage from "./lazy-image";
import NotesSkeleton from "./skeletons/notes-skeleton";

interface NotesProps {
	notes: Note[];
	loading: boolean;
	imageUrl?: string;
}

const Notes = ({ notes, loading, imageUrl }: NotesProps) => {
	const notesAvailable = notes && notes.length > 0;

	if (loading) {
		return <NotesSkeleton />;
	}

	if (!notesAvailable) {
		return (
			<div className="py-3">
				<p className="text-muted-foreground">No notes available</p>
			</div>
		);
	}

	return (
		<div className="py-3">
			{notes.map((note) => {
				return (
					<div
						key={note.timestamp}
						className="grid grid-cols-[auto_1fr] items-center gap-x-4 my-2"
					>
						<LazyImage
							src={imageUrl}
							alt=""
							className="size-14 rounded-lg object-cover"
						/>
						<div>
							<p className="font-medium text-base leading-6">Spotted in NYC</p>
							<p className="text-sm text-accent-foreground">{note.comment}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Notes;
