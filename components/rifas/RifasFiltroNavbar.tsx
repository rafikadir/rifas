import { rifaStatus, RifaStatusType } from "@/src/interfaces/rifas";
import Link from "next/link";

export default function RifasFiltroNavbar({
	estado,
	isAdmin = false,
}: {
	estado: RifaStatusType;
	isAdmin?: boolean;
}) {
	const rifasRoute = isAdmin ? "/admin/rifas" : "/rifas";

	const getLinkClasses = (status: string) =>
		`px-2 py-0.5 rounded-lg ${
			estado === status ? "bg-primary text-white" : "hover:bg-gray-400"
		}`;

	return (
		<div className="bg-blue-500 text-light p-2 rounded-xl flex flex-wrap space-x-4">
			<Link
				className={getLinkClasses(rifaStatus.ACTIVA)}
				href={`${rifasRoute}/estado/${rifaStatus.ACTIVA}`}
			>
				En curso
			</Link>
			<Link
				className={getLinkClasses(rifaStatus.PROXIMA)}
				href={`${rifasRoute}/estado/${rifaStatus.PROXIMA}`}
			>
				Próximas
			</Link>
			<Link
				className={getLinkClasses(rifaStatus.FINALIZADA)}
				href={`${rifasRoute}/estado/${rifaStatus.FINALIZADA}`}
			>
				Pasadas
			</Link>
			{isAdmin && (
				<Link
					className={getLinkClasses(rifaStatus.OCULTA)}
					href={`${rifasRoute}/estado/${rifaStatus.OCULTA}`}
				>
					Ocultas
				</Link>
			)}
		</div>
	);
}
