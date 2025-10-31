import { useCallback, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useCreateNotes from "@/hooks/use-create-notes";

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
		//show me the result of the mutation
		if (data) {
			console.log("Note added successfully:", data);
		}
		if (error) {
			console.error("Error adding note:", error);
		}
	}, [data, error]);

	// if successfully added note, close the dialog
	useEffect(() => {
		if (data) {
			handleOnCloseDialog();
		}
	}, [data, handleOnCloseDialog]);

	return (
		<Dialog open={isOpen} onOpenChange={handleOnCloseDialog}>
			<DialogContent className="sm:max-w-md" aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle>Add note {loading && "..."}</DialogTitle>
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
				<DialogFooter className="sm:justify-end border-t flex items-center gap-4">
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Close
						</Button>
					</DialogClose>
					<Button type="submit" form="notes" disabled={!isValid || loading}>
						{loading ? "Creating note..." : "Add note"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
export default DialogNotes;
