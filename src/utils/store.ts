import { create } from "zustand";
import { OrderItemType } from "../interfaces/orders";
import { IPublicRifaModel, IRifaModel, IRifaForm } from "../interfaces/rifas";
import { getSubtotal } from "./getSubtotal";
import { boletoStatus } from "../interfaces/boletos";

const saveOrderToLocalStorage = (order: Record<number, OrderItemType>) => {
	localStorage.setItem("order", JSON.stringify(order));
};

export interface Store {
	order: Record<IRifaModel["serie"], OrderItemType>;
	confirmedOrder: Record<number, OrderItemType>;
	orderIsConfirmed: boolean;

	addToCart: (rifa: IPublicRifaModel, tickets: number[]) => void;
	confirmOrder: () => void;
	clearOrder: () => void;
	removeRifa: (serie: string) => void;
	removeBoleto: (serie: string, ticket: number) => void;
	initOrderFromLocalStorage: (order: Record<number, OrderItemType>) => void;
}

export interface CreateRifaStore {
	rifa: IRifaForm | null;
}

export const useStore = create<Store>((set, get) => ({
	order: {},
	confirmedOrder: {},
	orderIsConfirmed: false,

	initOrderFromLocalStorage: (order) => {
		set({ order });
	},
	confirmOrder: () => {
		const state = get();
		set({
			orderIsConfirmed: true,
			confirmedOrder: state.order,
			order: {},
		});
		localStorage.removeItem("order");
	},
	clearOrder: () => {
		set({ orderIsConfirmed: false, confirmedOrder: {} });
	},
	addToCart: (rifa, boletos) => {
		const state = get();
		const currentOrder = state.order[rifa.serie];

		// Filtramos boletos ocupados o duplicados
		// const boletosOcupados = Object.keys(rifa.boletosOcupados);
		// const boletosOcupados = rifa.boletos.map(boleto => boleto.numero);

		const boletosValidos = boletos.filter(
			(ticket) =>
				Object.entries(rifa.boletos).map(
					([index, boleto]) =>
						index === String(ticket) &&
						boleto.estado === boletoStatus.DISPONIBLE
				) &&
				// Object.keys(rifa.boletos).get(String(ticket))?.estado === boletoStatus.DISPONIBLE &&
				!(currentOrder && currentOrder?.boletosApartados.includes(ticket))
		);

		if (boletosValidos.length === 0) return;

		// Si ya existe una orden para la rifa, agregar los nuevos boletos a esa orden
		if (currentOrder) {
			const totalBoletos =
				currentOrder.boletosApartados.length + boletosValidos.length;
			
			const subtotal = getSubtotal(
				rifa.price,
				boletosValidos.length
			);
			const boletosGratis = Math.floor(totalBoletos / 10);
			const boletosApartados = [
				...currentOrder.boletosApartados,
				...boletosValidos,
			];

			const updatedOrder = {
				...state.order,
				[rifa.serie]: {
					...currentOrder,
					boletosApartados,
					boletosGratis: [boletosGratis],
					subtotal:currentOrder.subtotal + subtotal,
				},
			};

			set({ order: updatedOrder });
			saveOrderToLocalStorage(updatedOrder);
		} else {
			// Si no existe una orden previa para la rifa, creamos una nueva
			const boletosGratis = Math.floor(boletosValidos.length / 10);
			const subtotal = getSubtotal(rifa.price, boletosValidos.length);

			const newOrder = {
				...state.order,
				[rifa.serie]: {
					serie: rifa.serie,
					title: rifa.title,
					price: rifa.price,
					slug: rifa.slug,
					boletosApartados: boletosValidos,
					boletosGratis: [boletosGratis],
					subtotal,
				},
			};
			set({ order: newOrder });
			saveOrderToLocalStorage(newOrder);
		}
	},
	removeBoleto: (serie, boleto) => {
		const state = get();
		const currentOrder = state.order[serie];

		if (currentOrder) {
			const updatedBoletos = currentOrder.boletosApartados.filter(
				(item) => item !== boleto
			);
			const subtotal = updatedBoletos.length * currentOrder.price;
			const updatedOrder = {
				...state.order,
				[serie]: {
					...currentOrder,
					boletosApartados: updatedBoletos,
					subtotal,
				},
			};
			const updatedCurrentOrder = updatedOrder[serie];
			// Si no quedan más boletos en la serie, eliminamos la rifa completa
			if (updatedCurrentOrder?.boletosApartados.length === 0) {
				delete updatedOrder[serie];
			}
			// Si quedan suficientes boletos, aplicar la lógica de boletosGratis
			if (
				updatedCurrentOrder &&
				(updatedCurrentOrder.boletosApartados.length + 1) % 10 === 0
			) {
				updatedCurrentOrder.boletosGratis[0] -= 1;
				updatedOrder[serie] = updatedCurrentOrder; // Actualiza la serie con los boletosGratis modificados
			}

			saveOrderToLocalStorage(updatedOrder);
			set({ order: updatedOrder });
		}
	},
	removeRifa: (serie) => {
		set((state) => {
			const updatedOrder = { ...state.order };
			delete updatedOrder[serie];
			saveOrderToLocalStorage(updatedOrder);
			return { order: updatedOrder };
		});
	},
}));

