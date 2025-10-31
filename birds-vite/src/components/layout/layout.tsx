const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="grid grid-cols-[1fr] sm:grid-cols-[307px_1fr] min-h-screen divide-border divide-x">
			{children}
		</div>
	);
};

export default Layout;
