export default function formatDuration(
  seconds: number
) {
  if (!seconds) return "-- mins";

  const minutes = Math.ceil(seconds / 60);

  const hrs = Math.floor(minutes / 60);

  const mins = minutes % 60;

  if (hrs === 0) {
    return `${mins} mins`;
  }

  return `${hrs} hrs ${mins} mins`;
}