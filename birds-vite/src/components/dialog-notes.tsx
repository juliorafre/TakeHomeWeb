import { LoaderIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Button from "@/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/shadcn/dialog";
import useCreateNotes from "@/hooks/use-create-notes";

type ButtonState = "idle" | "loading" | "success";

const buttonCopy: Record<ButtonState, React.ReactNode> = {
	idle: "Add note",
	loading: (
		<LoaderIcon
			size={14}
			color="rgba(255, 255, 255, 0.65)"
			className="animate-spin"
		/>
	),
	success: "Note added!",
};

interface DialogNotesProps {
	isOpen: boolean;
	onCloseDialog: () => void;
	birdId: string;
}

type NoteInputs = {
	location: string;
	note: string;
};

const DialogNotes = ({ isOpen, onCloseDialog, birdId }: DialogNotesProps) => {
	const [buttonState, setButtonState] = useState<ButtonState>("idle");
	const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const {
		register,
		handleSubmit,
		reset: resetForm,
		formState: { errors, isValid },
	} = useForm<NoteInputs>({ mode: "onChange" });
	const {
		createNote,
		loading,
		error,
		data,
		reset: resetMutation,
	} = useCreateNotes();

	const onSubmit: SubmitHandler<NoteInputs> = (data) => {
		setButtonState("loading");
		createNote({
			birdId: birdId,
			comment: data.note,
			timestamp: Math.floor(Date.now() / 1000),
		});
	};

	const handleOnCloseDialog = useCallback(() => {
		onCloseDialog();
		resetForm();
		resetMutation();
	}, [onCloseDialog, resetForm, resetMutation]);

	useEffect(() => {
		if (data) {
			setButtonState("success");
			resetForm();
			resetMutation();
			closeTimeoutRef.current = setTimeout(() => {
				onCloseDialog();
				setButtonState("idle");
			}, 800);
		}
	}, [data, onCloseDialog, resetForm, resetMutation]);

	useEffect(() => {
		return () => {
			if (closeTimeoutRef.current) {
				clearTimeout(closeTimeoutRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (error) {
			setButtonState("idle");
			toast.error("An error occurred while creating the note.");
		}
	}, [error]);

	return (
		<Dialog open={isOpen} onOpenChange={handleOnCloseDialog}>
			<DialogContent className="sm:max-w-md" aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle>Add note</DialogTitle>
				</DialogHeader>
				<div className="flex items-center gap-2 p-4 space-y-4">
					<div className="grid flex-1 gap-2">
						<form
							id="notes"
							className="space-y-2"
							onSubmit={handleSubmit(onSubmit)}
						>
							<label className="block text-sm font-medium text-gray-700">
								<span className="text-input-label text-[13px] font-semibold">
									Location
								</span>
								<input
									type="text"
									{...register("location", {
										required: "Location is required",
									})}
									placeholder="Where did you spot it?"
									className="px-2.5 py-2 block w-full text-[13px] mt-2 rounded-sm placeholder:text-[#8E95AF] text-black placeholder:font-normal font-medium bg-accent-foreground/8 border-transparent outline-none border
                  focus:outline-none focus:ring-3 focus:ring-primary/20 focus:ring-offset-background focus:border-primary
                  disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={loading}
									aria-disabled={loading}
								/>
								{errors.location && (
									<span className="text-red-500 text-xs mt-1 block">
										{errors.location.message}
									</span>
								)}
							</label>
							<label className="block text-sm font-medium text-gray-700">
								<span className="text-input-label text-[13px] font-semibold">
									Note
								</span>
								<textarea
									{...register("note", { required: "Note is required" })}
									rows={4}
									placeholder="Enter your notes here"
									className="px-2.5 py-2 block w-full text-[13px] mt-2 rounded-sm placeholder:text-[#8E95AF] text-black placeholder:font-normal font-medium bg-accent-foreground/8 border-transparent outline-none border
                  focus:outline-none focus:ring-3 focus:ring-primary/20 focus:ring-offset-background focus:border-primary
                  disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={loading}
									aria-disabled={loading}
								/>
								{errors.note && (
									<span className="text-red-500 text-xs mt-1 block">
										{errors.note.message}
									</span>
								)}
							</label>
						</form>
					</div>
				</div>
				<DialogFooter className="justify-between border-t flex flex-row items-center gap-4">
					<div>
						{error && (
							<p className="text-red-500 text-xs">
								An error occurred while creating the note.
							</p>
						)}
					</div>
					<div className="flex flex-row items-center gap-4 ">
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Close
							</Button>
						</DialogClose>
						<Button
							type="submit"
							form="notes"
							disabled={!isValid || loading}
							className="flex items-center justify-center w-[90px]"
						>
							<AnimatePresence mode="popLayout" initial={false}>
								<motion.span
									transition={{ type: "spring", duration: 0.3, bounce: 0 }}
									initial={{ opacity: 0, y: -25 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 25 }}
									key={buttonState}
								>
									{buttonCopy[buttonState]}
								</motion.span>
							</AnimatePresence>
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
export default DialogNotes;
