import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/utils/constants";
import { FC, HTMLAttributes } from "react";

interface DeleteCustomerAlertDialogProps
  extends HTMLAttributes<HTMLDivElement> {
  onDeleteCustomer: () => void;
}

const DeleteCustomerAlertDialog: FC<DeleteCustomerAlertDialogProps> = ({
  ...props
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Wanna delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently remove the customer and cannot be undo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={props.onDeleteCustomer}
            className={buttonVariants({
              variant: "negative",
            })}
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCustomerAlertDialog;
