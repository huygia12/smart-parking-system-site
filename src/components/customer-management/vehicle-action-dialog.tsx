import { HTMLAttributes, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/utils/constants";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleFormProps, vehicleSchema } from "@/utils/schema";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/effect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ActionResult } from "@/types/component";
import { Vehicle } from "@/types/model";

interface VehicleActionDialogProps extends HTMLAttributes<HTMLDivElement> {
  vehicle?: Vehicle;
  type: `Edit` | `Add`;
  onSave: (data: VehicleFormProps) => Promise<ActionResult>;
}

const VehicleActionDialog: React.FC<VehicleActionDialogProps> = ({
  className,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormProps>({
    resolver: zodResolver(vehicleSchema),
  });

  useEffect(() => {
    if (props.vehicle) {
      setValue("licensePlate", props.vehicle.licensePlate);
    }
  }, [props.vehicle, setValue]);

  const handleFormSubmission: SubmitHandler<VehicleFormProps> = async (
    data
  ) => {
    const result = await props.onSave(data);
    if (result.status) {
      toast.success(result.message);
      props.type == `Add` && reset();
    } else toast.error(result.message);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(handleFormSubmission)();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="min-w-[30rem]">
        <DialogHeader className="min-h-10 mb-2">
          <DialogTitle className="text-[1.5rem]">
            {props.type} Vehicle Information
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmission)}>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <Label
                htmlFor="licensePlate"
                className="text-lg my-auto w-[20rem]"
              >
                License Plate
                <span className="text-red-600 ">*</span>
              </Label>
              <Input
                id="licensePlate"
                {...register("licensePlate")}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="eg: 14Y1 xxxxx"
                className="h-full text-lg placeholder_italic placeholder_text-base focus-visible_ring-0 border-2 border-gray-300"
              />
            </div>
            <div className="flex justify-end">
              {(errors.root || errors.licensePlate) && (
                <div className="text-red-600 my-auto ml-auto mr-6 text-right">
                  {(errors.root || errors.licensePlate)!.message}
                </div>
              )}
              <Button
                disabled={isSubmitting}
                className={cn(
                  "mt-auto",
                  buttonVariants({ variant: "positive" })
                )}
              >
                {!isSubmitting ? (
                  "Save"
                ) : (
                  <>
                    <LoadingSpinner size={26} className="text-white" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleActionDialog;
