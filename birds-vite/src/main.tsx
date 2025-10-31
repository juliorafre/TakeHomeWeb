import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { NotesDialogProvider } from "./context/notes-dialog-context.tsx";
import ApiProvider from "./providers/ApiProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ApiProvider>
			<BrowserRouter>
				<NotesDialogProvider>
					<App />
				</NotesDialogProvider>
				<Toaster
					position="bottom-right"
					toastOptions={{
						style: {
							borderRadius: "calc(var(--spacing) * 2)",
							color: "var(--foreground)",
						},
					}}
				/>
			</BrowserRouter>
		</ApiProvider>
	</StrictMode>,
);
