import clsx, { ClassValue } from "clsx";

export function cn(...classes: ClassValue[]) {
  return clsx(classes);
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  }).format(value);
}
