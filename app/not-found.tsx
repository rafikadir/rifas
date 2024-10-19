import { SessionWrapperWithNavBar } from "@/components/auth/SessionWrapper";
import Link from "next/link";

const NotFound = () => {
	return (
		<SessionWrapperWithNavBar>
			<div className="text-center space-y-8">
				<p className="my-16 mb-4 text-3xl text-center leading-7 text-secondary">
					Lo siento, la página que buscas no existe.
				</p>
				<div>
					<Link
						href={"/"}
						className="bg-primary text-white text-xl text-center font-bold py-2 px-4 w-full lg:w-auto cursor-pointer rounded"
					>
						Ir a inicio
					</Link>
				</div>
			</div>
		</SessionWrapperWithNavBar>
	);
};

export default NotFound;
