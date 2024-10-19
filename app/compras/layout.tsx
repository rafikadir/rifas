import { Metadata } from "next";
import { SessionWrapperWithNavBar } from "@/components/auth/SessionWrapper";
import ToastNotification from "@/components/ui/ToastNotification";

export const metadata: Metadata = {
	title: "Mis compras",
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {

	return (
		<SessionWrapperWithNavBar>
			{children}
			<ToastNotification />
		</SessionWrapperWithNavBar>
	);
}
