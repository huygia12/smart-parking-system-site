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

interface DeleteCardAlertDialogProps extends HTMLAttributes<HTMLDivElement> {
  onDeleteCard: () => void;
}

const DeleteCardAlertDialog: FC<DeleteCardAlertDialogProps> = ({
  ...props
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Wanna delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently remove card and cannot be undo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={props.onDeleteCard}
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

export default DeleteCardAlertDialog;
