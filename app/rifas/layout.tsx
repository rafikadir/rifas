import Carrito from "@/components/ui/carrito/Carrito";
import { SessionWrapperWithNavBar } from "@/components/auth/SessionWrapper";
import { Metadata } from "next";
import BackButtonWrapper from "@/components/ui/BackButtonWraper";
import ToastNotification from "@/components/ui/ToastNotification";

export const metadata: Metadata = {
	title: "Rifas",
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<SessionWrapperWithNavBar>
			<BackButtonWrapper>
				<div className="max-w-lg mx-auto">
					<Carrito />
					{children}
				</div>
			</BackButtonWrapper>
			<ToastNotification />
		</SessionWrapperWithNavBar>
	);
}
