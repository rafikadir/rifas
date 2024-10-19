import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/src/lib/auth/getSession";
import { SessionWrapperWithNavBar } from "@/components/auth/SessionWrapper";
import AdminSecondaryNavbar from "@/components/admin/SecondaryNavbar";
import ToastNotification from "@/components/ui/ToastNotification";

export const metadata: Metadata = {
	title: "Administrador",
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const session = await getSession();

	if (!session) {
		redirect("/api/auth/signin");
	}

	return (
		<SessionWrapperWithNavBar>
			<AdminSecondaryNavbar role={session.user.role} />
			{children}
			<ToastNotification />
		</SessionWrapperWithNavBar>
	);
}
