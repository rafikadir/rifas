import { Metadata } from "next";
import { RifaStatusType } from "@/src/interfaces/rifas";

import { RifaCard } from "@/components/rifas/RifaCard";
import RifasFiltroNavbar from "@/components/rifas/RifasFiltroNavbar";

import { getRifasByEstado } from "@/actions/rifas/getRifas";

export const metadata: Metadata = {
	title: "Rifas El Magnate",
	description: "Rifas El Magnate",
};

type Params = {
	params: { estado: RifaStatusType };
};

export default async function RifasByEstadoPage({ params }: Params) {
	const estado = params.estado;
	const { data: rifas } = await getRifasByEstado(estado);

	return (
		<>
			<div className="my-2">
				<RifasFiltroNavbar estado={estado} />
			</div>

			<div className="grid grid-cols-2 gap-2 items-start">
				{rifas?.map((rifa, key) => {
					return <RifaCard key={key} rifa={rifa} height="h-52" />;
				})}
			</div>
		</>
	);
}
