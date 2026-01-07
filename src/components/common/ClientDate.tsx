import dateFormat from "dateformat";

export default function ClientDate({ date }: { date: string }) {
  const formatted = dateFormat(new Date(date), "HH:MM, d mmm yyyy");
  return <span>🕑{formatted}</span>;
}
