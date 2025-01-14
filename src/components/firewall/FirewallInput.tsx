import { SubmitHandler, useForm, FieldError, Path } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AnyObjectSchema } from "yup";

interface FirewallInputProps<T> {
  schema: AnyObjectSchema;
  onSubmit: (data: T) => void;
  title: string;
  sanitizeData: (data: T) => T;
}

const FirewallInput = <
  T extends {
    protocol: string;
    source: string;
    source_port_range: string;
    destination: string;
    destination_port_range: string;
    description: string;
  },
>({
  schema,
  onSubmit,
  title,
  sanitizeData,
}: FirewallInputProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<T> = (data: T) => {
    onSubmit(sanitizeData(data));
  };

  return (
    <div className="rounded-sm bg-muted p-4">
      <h1 className="text-primary sm:text-base md:text-base">{title}</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex w-full space-x-2">
          {/* Form Fields */}
          <div className="flex-[1]">
            <label htmlFor="protocol" className="truncate text-xs font-medium">
              Protocol :
            </label>
            <Input
              placeholder="Enter 'TCP'"
              id="protocol"
              {...register("protocol" as Path<T>)}
            />
            {errors.protocol && (
              <p className="mt-1 text-xs text-red-500">
                {(errors.protocol as FieldError)?.message}
              </p>
            )}
          </div>

          <div className="flex-[2.5]">
            <label htmlFor="source" className="truncate text-xs font-medium">
              Source IP/Subnet :
            </label>
            <Input
              placeholder="e.g., 192.168.0.0/24 or 'any'"
              id="source"
              {...register("source" as Path<T>)}
            />
            {errors.source?.message && (
              <p className="mt-1 text-xs text-red-500">
                {(errors.source as FieldError)?.message}
              </p>
            )}
          </div>

          <div className="flex-[2.5]">
            <label
              htmlFor="source_port_range"
              className="truncate text-xs font-medium"
            >
              Source Port :
            </label>
            <Input
              placeholder="Enter port (0-9999) or 'any'"
              id="source_port_range"
              {...register("source_port_range" as Path<T>)}
            />
            {errors.source_port_range?.message && (
              <p className="mt-1 text-xs text-red-500">
                {(errors.source_port_range as FieldError)?.message}
              </p>
            )}
          </div>

          <div className="flex-[2.5]">
            <label
              htmlFor="destination"
              className="truncate text-xs font-medium"
            >
              Destination IP :
            </label>
            <Input
              placeholder="e.g., 192.168.0.0/24 or 'any'"
              id="destination"
              {...register("destination" as Path<T>)}
            />
            {errors.destination?.message && (
              <p className="mt-1 text-xs text-red-500">
                {(errors.destination as FieldError)?.message}
              </p>
            )}
          </div>

          <div className="flex-[2.5]">
            <label
              htmlFor="destination_port_range"
              className="truncate text-xs font-medium"
            >
              Destination Port :
            </label>
            <Input
              placeholder="Enter port (0-9999) or 'any'"
              id="destination_port_range"
              {...register("destination_port_range" as Path<T>)}
            />
            {errors.destination_port_range?.message && (
              <p className="mt-1 text-xs text-red-500">
                {(errors.destination_port_range as FieldError)?.message}
              </p>
            )}
          </div>

          <div className="flex-[3]">
            <label
              htmlFor="description"
              className="truncate text-xs font-medium"
            >
              Description :
            </label>
            <Input
              placeholder="Describe the rule (e.g., allow SSH traffic)"
              id="description"
              {...register("description" as Path<T>)}
            />
            {errors.description?.message && (
              <p className="mt-1 text-xs text-red-500">
                {(errors.description as FieldError)?.message}
              </p>
            )}
          </div>

          <div className="relative flex flex-[1]">
            <Button
              type="submit"
              className="absolute top-[26px] w-full"
              size={"sm"}
              variant={"secondary"}
            >
              Add
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FirewallInput;
