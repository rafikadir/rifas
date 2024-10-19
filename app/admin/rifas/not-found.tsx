import Link from "next/link";

const NotFound = () => {
	return (
		<div className="text-center">
			<p className="mt-16 mb-4 text-base text-center leading-7 text-secondary">
				Lo siento, la rifa que buscas no existe o la creó otro vendedor.
			</p>
			<Link
				href={"/admin/rifas/estado/activa"}
				className="bg-primary text-white text-xl text-center font-bold py-2 px-4 w-full lg:w-auto cursor-pointer rounded"
			>
				Ir a rifas
			</Link>
		</div>
	);
};

export default NotFound;
