"use client";
import { IUserModel } from "@/src/interfaces/users";
import { useStore } from "@/src/utils/store";
import BackButtonWrapper from "../ui/BackButtonWraper";
import ConfirmacionCard from "./ConfirmacionCard";
import PagoResumenCard from "./PagoResumenCard";

export const PagoComponent = ({
	user,
	adminPhoneNumber,
}: {
	user: IUserModel;
	adminPhoneNumber: string;
}) => {

	const order = useStore((state) => state.order);
	const orderIsConfirmed = useStore((state) => state.orderIsConfirmed);
	return (
		<>
			{orderIsConfirmed ? (
				<ConfirmacionCard user={user} />
			) : (
				<BackButtonWrapper>
					<PagoResumenCard order={order} user={user} adminPhoneNumber={adminPhoneNumber} />
				</BackButtonWrapper>
			)}
		</>
	);
};
