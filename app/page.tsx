import { Suspense } from "react";
import FAQ from "@/components/ui/FAQ";
import ImageCover from "@/components/ui/ImageCover";
import ConcursosySorteos from "@/components/rifas/ConcursosySorteos";
import { SessionWrapperWithNavBar } from "@/components/auth/SessionWrapper";
import MainPageSkeleton from "@/components/ui/loaders/MainPageSkeleton";

export default function Home() {
	return (
		<Suspense>
			<SessionWrapperWithNavBar>
				<ImageCover buttonUrl={"/rifas/estado/activa"} />
				<ConcursosySorteos />
				<FAQ />
			</SessionWrapperWithNavBar>
		</Suspense>
	);
}
