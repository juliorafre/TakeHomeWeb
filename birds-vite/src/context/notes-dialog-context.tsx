import { createContext, type ReactNode, useContext, useState } from "react";

interface NotesDialogContextType {
	isOpen: boolean;
	openDialog: () => void;
	closeDialog: () => void;
}

const NotesDialogContext = createContext<NotesDialogContextType | undefined>(
	undefined,
);

export const NotesDialogProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = () => setIsOpen(true);
	const closeDialog = () => setIsOpen(false);

	return (
		<NotesDialogContext.Provider
			value={{
				isOpen,
				openDialog,
				closeDialog,
			}}
		>
			{children}
		</NotesDialogContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotesDialog = () => {
	const context = useContext(NotesDialogContext);
	if (context === undefined) {
		throw new Error("useNotesDialog must be used within a NotesDialogProvider");
	}
	return context;
};
