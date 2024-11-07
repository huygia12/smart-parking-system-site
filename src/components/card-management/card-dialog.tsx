import { HTMLAttributes } from "react";
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
import { CardFormProps, cardSchema } from "@/utils/schema";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/effect";
import { Button } from "@/components/ui/button";
import { Card } from "@/types/model";

interface CardDialogProps extends HTMLAttributes<HTMLDivElement> {
  card?: Card;
  type: `Edit` | `Add`;
  onSave: (data: CardFormProps) => void;
}

const AddCardDialog: React.FC<CardDialogProps> = ({ className, ...props }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CardFormProps>({
    resolver: zodResolver(cardSchema),
    defaultValues: props.card && {
      cardId: props.card.cardId,
    },
  });

  const handleFormSubmission: SubmitHandler<CardFormProps> = (data) => {
    props.onSave(data);
    if (props.type === `Add`) {
      reset();
    }
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
      <DialogContent className="min-w-[20rem]">
        <DialogHeader className="min-h-10">
          <DialogTitle className="text-[1.5rem]">{props.type} Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmission)}>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <Label htmlFor="cardId" className="text-lg my-auto w-[10rem]">
                Card Id
                <span className="text-red-600 ">*</span>
              </Label>
              <Input
                id="cardId"
                {...register("cardId")}
                type="text"
                className="h-full text-lg focus-visible_ring-0 border-2 border-gray-300"
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex justify-end">
              {(errors.root || errors.cardId) && (
                <div className="text-red-600 my-auto ml-auto mr-6 text-right">
                  {(errors.root || errors.cardId)!.message}
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

export default AddCardDialog;
