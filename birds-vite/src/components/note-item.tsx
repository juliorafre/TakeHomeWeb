import type { Note } from "@/graphql/schemas/Bird";

interface NoteItemProps {
	note: Note;
	imageSrc: string;
}

const NoteItem = ({ note, imageSrc }: NoteItemProps) => {
	return (
		<div>
			<img src={imageSrc} alt="" />
			<div>
				<h3 className="font-medium leading-6">Spotted in NYC</h3>
				<p className="text-accent-foreground text-sm leading-subtitles">
					My first time seeing one in the wild!
				</p>
			</div>
		</div>
	);
};

export default NoteItem;
