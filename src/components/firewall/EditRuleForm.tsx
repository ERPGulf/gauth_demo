import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

interface RuleFormData {
  protocol: string;
  source: string;
  source_port_range: string;
  destination: string;
  destination_port_range: string;
  description: string;
}

interface EditRuleFormProps {
  rule: RuleFormData;
  schema: any;
  sanitizeData: (data: RuleFormData) => RuleFormData;
  onSubmit: (data: RuleFormData) => void;
  setEditToggle: (val: boolean) => void;
}

const EditRuleForm: React.FC<EditRuleFormProps> = ({
  rule,
  schema,
  sanitizeData,
  onSubmit,
  setEditToggle,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RuleFormData>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: rule,
  });

  const handleValidSubmit: SubmitHandler<RuleFormData> = (data) => {
    const sanitizedData = sanitizeData(data);
    onSubmit(sanitizedData);
    setEditToggle(false);
  };

  const handleInvalidSubmit = () => {
    Object.entries(errors).forEach(([key, error]) => {
      if (error && "message" in error) {
        toast.error(`${key} error!`, {
          description: String(error.message),
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}>
      <div className="flex min-h-12 w-full space-x-1 rounded-sm bg-secondary p-1">
        <div className="flex flex-[1] items-center justify-center rounded-[5px] bg-background px-2">
          <Input
            id="protocol"
            {...register("protocol")}
            className="h-8 w-full border-0 bg-background py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
          <Input
            id="source"
            {...register("source")}
            className="h-8 w-full border-0 bg-background py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
          <Input
            id="source_port_range"
            {...register("source_port_range")}
            className="h-8 w-full border-0 bg-background py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
          <Input
            id="destination"
            {...register("destination")}
            className="h-8 w-full border-0 bg-background py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
          <Input
            id="destination_port_range"
            {...register("destination_port_range")}
            className="h-8 w-full border-0 bg-background py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex flex-[3] items-center justify-center rounded-[5px] bg-background px-2">
          <Input
            id="description"
            {...register("description")}
            className="h-8 w-full border-0 bg-background py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex flex-[1] items-center justify-end space-x-2 rounded-[5px] bg-background px-2">
          <Button type="submit" size={"icon"} className="size-7 rounded-sm">
            <Check />
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            className="size-7 rounded-sm"
            onClick={() => setEditToggle(false)}
          >
            <X />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditRuleForm;
