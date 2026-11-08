export const toDateInput = (iso: string) => iso.slice(0, 10);

/** Today's date (YYYY-MM-DD) in Thai time: same rule as the backend, on server and client. */
export const todayInThailand = () =>
  new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);

const pad = (n: number) => String(n).padStart(2, "0");

/** "HH:mm" -> minutes after midnight. */
export const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/** Minutes after midnight -> "HH:mm" (1440 -> "24:00"). */
export const toTime = (minutes: number) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;

export function endTime(startTime: string, durationHours: number) {
  return toTime(toMinutes(startTime) + Math.round(durationHours * 60));
}

/** Booking dates are stored as midnight UTC, so format them in UTC. */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
