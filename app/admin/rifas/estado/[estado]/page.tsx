import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { RifaStatusType } from "@/src/interfaces/rifas";
import { adminGetRifasByEstado } from "@/actions/vendedor/adminGetRifasByEstado";
import { getRifasCount } from "@/actions/rifas/getRifasTotal";

import { RifaAdminCard } from "@/components/admin/rifas/RifaAdminCard";
import RifasFiltroNavbar from "@/components/rifas/RifasFiltroNavbar";

export const metadata: Metadata = {
	title: "Rifas El Magnate",
	description: "Rifas El Magnate",
};

type Params = {
	params: { estado: RifaStatusType };
};

export default async function RifasByEstadoPage({ params }: Params) {
	const estado = params.estado;
	const { data: rifas } = await adminGetRifasByEstado(estado);
	const { data: rifasTotal } = await getRifasCount();

	return (
		<>
			<div className="my-2 flex space-y-2 flex-col">
				<div className="sm:ml-16">
					<RifasFiltroNavbar estado={estado} isAdmin />
				</div>
				
				<div className="flex items-center">
					<span className="text-dark text-xl font-bold sm:ml-10">
						Total: {rifas.length}/{rifasTotal}
					</span>
					<Link
						href="/admin/rifas/nueva"
						className="w-44 ml-auto h-10 uppercase bg-blue-800 text-light font-bold text-sm shadow-md hover:bg-blue-900 rounded flex justify-center items-center transition duration-100"
					>
						<Image
							src="/assets/icons/add.svg"
							quality={20}
							alt="add button"
							width={30}
							height={30}
						/>
						<span className="px-4">Nueva rifa</span>
					</Link>
				</div>
			</div>
			<div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto justify-center">
				{rifas?.map((rifa, key) => {
					return <RifaAdminCard key={key} rifa={rifa} />;
				})}
			</div>
		</>
	);
}
