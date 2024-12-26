import { Card } from "@/types/model";
import { FC, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { toast } from "sonner";
import { CardTable, CardToolBar } from "@/components/card-management";
import { CardFormProps } from "@/utils/schema";
import axios, { HttpStatusCode } from "axios";
import { cardService } from "@/services";
import { ActionResult } from "@/types/component";

const CardManagement: FC = () => {
  const initData = useRouteLoaderData("card_management") as Card[];
  const [cards, setCards] = useState<Card[]>(initData);
  const [selectedCard, setSelectedCard] = useState<Card | undefined>();

  const handleDeleteCard = () => {
    const deleteUser = cardService.apis.deleteCard(selectedCard!.cardId);
    toast.promise(deleteUser, {
      loading: "Processing...",
      success: () => {
        setCards(cardService.deleteCard(selectedCard!, cards));
        setSelectedCard(undefined);
        return "Delete card succeed";
      },
      error: () => {
        return "Delete card failed";
      },
    });
  };

  const handleUpdateCard = async (
    data: CardFormProps
  ): Promise<ActionResult> => {
    try {
      const updatedCard = await cardService.apis.updateCard(
        selectedCard!.cardId,
        data
      );

      setCards(cardService.updateCard(updatedCard, cards));
      return { status: true, message: "Update card succeed" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.Conflict) {
          return {
            status: false,
            message: "Update card failed: card id conflict",
          };
        }
      }
      return {
        status: false,
        message: "Update card failed",
      };
    }
  };

  const handleAddCard = async (data: CardFormProps): Promise<ActionResult> => {
    try {
      const createdCard = await cardService.apis.createCard(data);

      setCards(cardService.addCard(createdCard, cards));
      return { status: true, message: "Create card succeed" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.Conflict) {
          return {
            status: false,
            message: "Add card failed: card id conflict",
          };
        }
      }
      return {
        status: false,
        message: "Add card failed",
      };
    }
  };

  return (
    <div className="my-8">
      <div className="flex gap-4 mx-auto w-xl">
        <CardTable
          cards={cards}
          onSelectCard={setSelectedCard}
          className="flex-1 w-1" // set width to make flex work ????
        />

        <CardToolBar
          selectedCard={selectedCard}
          handleAddCard={handleAddCard}
          handleUpdateCard={handleUpdateCard}
          handleDeleteCard={handleDeleteCard}
        />
      </div>
    </div>
  );
};

export default CardManagement;
