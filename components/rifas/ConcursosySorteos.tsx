import { Title } from "../ui/Title";
import { RifaCard } from "./RifaCard";
import { getAllRifas } from "@/actions/rifas/getRifas";

export default async function ConcursosySorteos() {
	const { data: rifas } = await getAllRifas();

	return (
		<div className="p-6 my-4 w-full sm:w-10/12 mx-auto bg-white rounded-2xl shadow-lg">
			<Title padding="p-2 pt-0 m-2 mt-0">Concursos y sorteos</Title>
			{rifas?.length === 0 ? (
				<p className="text-sm text-center text-gray-500">vacío</p>
			) : (
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
					{rifas?.map((rifa, key) => (
						<RifaCard key={key} rifa={rifa} height="h-40" />
					))}
				</div>
			)}
		</div>
	);
}
