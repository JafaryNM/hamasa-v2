import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateText = (text: string, limit = 50) => {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

export const formatArrayToCommaList = (items: any[], key: string) => {
  if (!items || !Array.isArray(items) || items.length === 0) return "None";
  return items.map((item) => item[key]).join(", ");
};
