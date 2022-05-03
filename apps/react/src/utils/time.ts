const addLeadingZero = (n: number) => (n < 10 ? `0${n}` : n.toString());

export const parseMs = (milliseconds: number) => {
  const minus = milliseconds < 0 ? "-" : "";
  const hours = Math.abs(Math.floor((milliseconds / (1000 * 60 * 60)) % 24));
  if (hours) return `${minus}${addLeadingZero(hours)}h`;
  const minutes = Math.abs(Math.floor((milliseconds / (1000 * 60)) % 60));
  if (minutes) return `${minus}${addLeadingZero(minutes)}m`;
  const seconds = Math.abs(Math.floor((milliseconds / 1000) % 60));
  return `${minus}${addLeadingZero(seconds)}s`;
};
