import ToastNotification from "@/components/ui/ToastNotification";
import { SessionWrapperWithNavBar } from "@/components/auth/SessionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagar",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <SessionWrapperWithNavBar>
      <div className="max-w-lg mx-auto">{children}</div>
      <ToastNotification />
    </SessionWrapperWithNavBar>
  );
}
