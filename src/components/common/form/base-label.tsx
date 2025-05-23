import { cn } from "@/lib/utils";
const BaseLabel = ({
  className,
  label,
}: {
  className: string;
  label: string;
}) => {
  return (
    <label className={cn(`text-default-600 text-xs`, className)}>{label}</label>
  );
};
export default BaseLabel;