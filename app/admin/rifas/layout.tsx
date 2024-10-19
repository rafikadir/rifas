import BackButtonWrapper from "@/components/ui/BackButtonWraper";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <BackButtonWrapper>{children}</BackButtonWrapper>;
}
