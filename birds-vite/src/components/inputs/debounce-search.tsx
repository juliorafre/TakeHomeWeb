import { useEffect, useRef, useState } from "react";

const DELAY = 300;

interface SearchProps {
	onSearch?: (value: string) => void;
}

const DebounceSearch = ({ onSearch }: SearchProps) => {
	const [inputValue, setInputValue] = useState("");
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			if (onSearch) {
				onSearch(inputValue);
			}
		}, DELAY);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [inputValue, onSearch]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="p-6">
			<div className="relative w-full bg-input px-4 py-3 rounded-xl grid grid-cols-[24px_1fr] gap-x-3">
				<div className="grid place-items-center">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="size-5 text-accent-foreground"
					>
						<title>Search icon</title>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M19.3013 18.2401L14.6073 13.547C17.4336 10.1538 17.0912 5.13769 13.8299 2.1601C10.5685 -0.817485 5.54206 -0.703249 2.41939 2.41942C-0.70328 5.54209 -0.817515 10.5686 2.16007 13.8299C5.13766 17.0912 10.1538 17.4337 13.547 14.6073L18.2401 19.3014C18.5332 19.5944 19.0083 19.5944 19.3013 19.3014C19.5944 19.0083 19.5944 18.5332 19.3013 18.2401ZM1.52072 8.27075C1.52072 4.54283 4.5428 1.52075 8.27072 1.52075C11.9986 1.52075 15.0207 4.54283 15.0207 8.27075C15.0207 11.9987 11.9986 15.0208 8.27072 15.0208C4.54451 15.0166 1.52485 11.997 1.52072 8.27075Z"
							fill="curretColor"
							style={{
								fill: "currentColor",
								fillOpacity: 1,
								WebkitTextFillColor: "color(display-p3 0.3100 0.4800 0.5900)",
							}}
						/>
					</svg>
				</div>

				<input
					className="w-full text-input-foreground placeholder:text-input-foreground focus:outline-none focus-visible:outline text-base leading-6"
					type="text"
					name="bird"
					value={inputValue}
					onChange={handleChange}
					placeholder="Search for bird"
				/>
			</div>
		</div>
	);
};

export default DebounceSearch;
