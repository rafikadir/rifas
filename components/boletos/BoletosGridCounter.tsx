"use client";
import { useStore } from "@/src/utils/store";
import React from "react";

type Props = {
  ticketsTotal: number;
  boletosOcupados: number;
  rifaSerie: string;
};

export const BoletosGridCounter = ({
  ticketsTotal,
  boletosOcupados,
  rifaSerie,
}: Props) => {
  const order = useStore((state) => state.order[rifaSerie]);
  const boletosOrder = order?.boletosApartados.length || 0;
  const boletosDisponibles = ticketsTotal - boletosOcupados - boletosOrder;

  return (
    <p className="m-4">
      Tickets: {boletosDisponibles} / {ticketsTotal}
    </p>
  );
};
