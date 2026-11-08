export const toDateInput = (iso: string) => iso.slice(0, 10);

export function endTime(startTime: string, durationHours: number) {
  const [h, m] = startTime.split(":").map(Number);
  const total = h * 60 + m + Math.round(durationHours * 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}
