"use client";
import { useEffect, useMemo } from "react";
import Link from "next/link";

import { OrderItemType } from "@/src/interfaces/orders";
import { useStore } from "@/src/utils/store";
import CarritoDetailsCard from "./OrderDetailsCard";
import { formatCurrency } from "@/src/utils/parsers";
import type { Store } from "@/src/utils/store";

export const calculateTotal = (
  order: Record<number, OrderItemType>
): number => {
  return Object.values(order).reduce((total, item) => {
    return total + item.boletosApartados.length * item.price;
  }, 0);
};

export const loadOrderFromLocalStorage = (): Store["order"] | null => {
  const storedOrder = localStorage.getItem("order");
  return storedOrder ? JSON.parse(storedOrder) : {};
};

export default function Carrito() {
  const { order, removeRifa, initOrderFromLocalStorage } = useStore(
    (state) => ({
      order: state.order,
      removeRifa: state.removeRifa,
      initOrderFromLocalStorage: state.initOrderFromLocalStorage,
    })
  );
  const total = useMemo(() => calculateTotal(order), [order]);
  const carritoTotal = useMemo(() => {
    return Object.keys(order).length === 0
      ? "(vacío)"
      : `(${Object.keys(order).length})`;
  }, [order]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOrder = loadOrderFromLocalStorage();
      if (storedOrder) {
        initOrderFromLocalStorage(storedOrder);
      }
    }
  }, [initOrderFromLocalStorage]);

  return (
    <details className="p-5 border rounded-lg border-gray-400 bg-white shadow-md">
      <summary className="text-3xl text-center font-bold flex items-center justify-center cursor-pointer list-none">
        <span className="mr-2 text-xl">🛒</span>
        Carrito{" "}
        <span className="text-sm text-gray-500 ml-2">{carritoTotal}</span>
      </summary>
      {Object.keys(order).length === 0 ? (
        <p className="text-center mt-2 text-gray-400">El carrito está vacío</p>
      ) : (
        <div className="mt-5 space-y-2">
          {Object.entries(order).map(([key, item]) => (
            <CarritoDetailsCard
              key={key}
              item={item}
              serie={key}
              removeRifa={removeRifa}
            />
          ))}
          <div className="text-2xl my-2 text-center">
            Total a pagar: {""}
            <span className="font-bold text-sky-900">
              {formatCurrency(total)}
            </span>
          </div>

          <Link href={"/pagar"}>
            <p className="py-2 my-2 uppercase text-light bg-sky-950 w-full text-center font-bold rounded-lg hover:text-sky-950 hover:bg-opacity-30 transition-colors duration-300">
              Pagar
            </p>
          </Link>
        </div>
      )}
    </details>
  );
}
