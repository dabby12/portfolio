export default function getMonth(): number {
  const now = new Date();
  return now.getMonth() + 1; // getMonth() returns 0–11, so +1
}
export function getMonthName(month: number): string {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month - 1]; // Adjust for 0-based index
}
