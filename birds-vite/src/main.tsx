import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";
import App from "./App.tsx";
import FullPageError from "./components/error-pages/full-page-error.tsx";
import { NotesDialogProvider } from "./contexts/notes-dialog-context.tsx";
import ApiProvider from "./providers/ApiProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary FallbackComponent={FullPageError}>
			<ApiProvider>
				<BrowserRouter>
					<NotesDialogProvider>
						<App />
						<Toaster
							position="bottom-right"
							toastOptions={{
								style: {
									borderRadius: "calc(var(--spacing) * 2)",
									color: "var(--foreground)",
								},
							}}
						/>
					</NotesDialogProvider>
				</BrowserRouter>
			</ApiProvider>
		</ErrorBoundary>
	</StrictMode>,
);
