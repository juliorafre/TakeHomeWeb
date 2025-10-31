import { Link } from "react-router";
import type { GetAllBirdsQuery } from "@/graphql/schemas/Bird";
import LazyImage from "./lazy-image";

interface BirdCardProps {
	bird: GetAllBirdsQuery;
}

const BirdCard = ({ bird }: BirdCardProps) => {
	return (
		<li className="rounded-2xl p-2 clickeable hover:bg-neutral-100">
			<Link
				to={`/bird/${bird.id}?name=${bird.english_name}`}
				state={{
					birdData: bird,
				}}
				aria-label={`View detials for ${bird.english_name}`}
				type="button"
				className="w-full cursor-pointer"
			>
				<figure className="space-y-3">
					<LazyImage
						className="w-full aspect-video object-cover rounded-xl  pointer-events-none"
						src={bird.thumb_url}
						alt={`${bird.english_name} - ${bird.latin_name}`}
					/>
					<figcaption className="pb-3 text-left">
						<h3 className="text-foreground font-medium">{bird.english_name}</h3>
						<p className="text-sm text-accent-foreground" lang="la">
							{bird.latin_name}
						</p>
					</figcaption>
				</figure>
			</Link>
		</li>
	);
};

export default BirdCard;
