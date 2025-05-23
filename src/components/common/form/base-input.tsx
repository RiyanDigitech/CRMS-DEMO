import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import BaseLabel from "./base-label";
import Input from "antd/es/input/Input";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type Props<T extends FieldValues> = {
  name: string;
  placeholder?: string;
  extraClass?: string;
  variant?: "underlined" | "flat" | "faded" | "bordered";
  type: "text" | "password" | "number" | "email" | "date" | "time";
  label?: string;
} & WithRequiredProperty<UseControllerProps<T>, "control">;
function BaseInput<T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder,
  extraClass,
  label,
  type,
}: Props<T>) {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  return (
    <>
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        className={cn(
          fieldState.invalid ? "custom-input error" : "custom-input",
          extraClass
        )}
      />
    </>
  );
}
export default BaseInput;
