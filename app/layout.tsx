import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Windows 10",
	description: "Created by Towhid",
	generator: "Towhid",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
