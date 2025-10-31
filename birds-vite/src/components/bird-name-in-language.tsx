interface BirdNameInLanguageProps {
	language: string;
	name: string;
}

const BirdNameInLanguage = ({ language, name }: BirdNameInLanguageProps) => {
	return (
		<div className="border-t border-border space-y-1 py-3 pr-2">
			<h6 className="text-sm text-accent-foreground leading-subtitles">
				{language}
			</h6>
			<p className="text-sm">{name}</p>
		</div>
	);
};

export default BirdNameInLanguage;
