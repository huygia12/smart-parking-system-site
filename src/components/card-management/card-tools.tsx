import { Button } from "@/components/ui/button";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { Card as CardWrapper, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Card } from "@/types/model";
import CardDialog from "./card-dialog";
import { CardFormProps } from "@/utils/schema";
import DeleteCardAlertDialog from "./delete-card-alert-dialog";

interface UserToolsProps extends HTMLAttributes<HTMLDivElement> {
  selectedCard: Card | undefined;
  handleDeleteCard: () => void;
  handleUpdateCard: (data: CardFormProps) => void;
  handleAddCard: (data: CardFormProps) => void;
}

const CardToolBar: FC<UserToolsProps> = ({ ...props }) => {
  return (
    <CardWrapper className={cn("rounded-xl shadow-lg", props.className)}>
      <CardContent className="p-4 space-y-4 flex flex-col">
        {/** add button */}
        <CardDialog type="Add" onSave={props.handleAddCard}>
          <Button variant="positive" className="text-xl">
            <Plus />
          </Button>
        </CardDialog>

        {props.selectedCard ? (
          <>
            <CardDialog
              type="Edit"
              card={props.selectedCard}
              onSave={props.handleUpdateCard}
            >
              <Button variant="neutral">
                <SquarePen />
              </Button>
            </CardDialog>

            <DeleteCardAlertDialog onDeleteCard={props.handleDeleteCard}>
              <Button variant="negative">
                <Trash2 />
              </Button>
            </DeleteCardAlertDialog>
          </>
        ) : (
          <>
            <SquarePen className="mx-4 !mt-6" />
            <Trash2 className="mx-4 !mt-6" />
          </>
        )}
      </CardContent>
    </CardWrapper>
  );
};

export default CardToolBar;
