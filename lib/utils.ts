import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Experience } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortExperiencesByDate(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    const dateA = new Date(a.endDate || a.startDate);
    const dateB = new Date(b.endDate || b.startDate);
    return dateB.getTime() - dateA.getTime();
  });
}

export function sortExperiencesByRelevance(experiences: Experience[]): Experience[] {
  const order = ['work', 'project', 'internship', 'education', 'certification'];
  return [...experiences].sort((a, b) => {
    const ia = order.indexOf(a.type);
    const ib = order.indexOf(b.type);
    if (ia === ib) {
      return (
        new Date(b.endDate || b.startDate).getTime() -
        new Date(a.endDate || a.startDate).getTime()
      );
    }
    return ia - ib;
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' });
}
