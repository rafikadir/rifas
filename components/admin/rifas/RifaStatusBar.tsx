import { rifaStatus, RifaStatusType } from "@/src/interfaces/rifas";

export const RifaStatusBar = ({ estado }: { estado: RifaStatusType }) => {
	const getStatusColor = () => {
		if (estado === rifaStatus.ACTIVA) return "green"; // ongoing: It's active and running, anyone can pick a ticket, it's not editable
		if (estado === rifaStatus.OCULTA) return "gray"; // oculta: It's unactive and only the admin can see it, it's editable
		if (estado === rifaStatus.FINALIZADA) return "gray"; // past: It's finished, anyone can see it, it's not editable
		return "";
	};
	return (
		<div
			className={`rounded-t bg-${getStatusColor()} h-1 w-full relative top-0`}
		></div>
	);
};