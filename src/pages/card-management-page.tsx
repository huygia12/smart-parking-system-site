import { Card } from "@/types/model";
import { FC, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { toast } from "sonner";
import { CardTable, CardToolBar } from "@/components/card-management";
import { CardFormProps } from "@/utils/schema";
import axios, { HttpStatusCode } from "axios";
import { cardService } from "@/services";

const CardManagement: FC = () => {
  const initData = useRouteLoaderData("card_management") as Card[];
  const [cards, setCards] = useState<Card[]>(initData);
  const [selectedCard, setSelectedCard] = useState<Card | undefined>();
  console.log(initData);

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

  const handleUpdateCard = (data: CardFormProps) => {
    const updateUser = cardService.apis.updateCard(selectedCard!.cardId, data);

    toast.promise(updateUser, {
      loading: "Processing...",
      success: (card: Card) => {
        setSelectedCard(card);
        setCards(cardService.updateCard(card, cards));
        return "Update card succeed";
      },
      error: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == HttpStatusCode.Conflict) {
            return "Update card failed: license plate conflict";
          }
        }
        return "Update card failed";
      },
    });
  };

  const handleAddCard = (data: CardFormProps) => {
    const createCard = cardService.apis.createCard(data);

    toast.promise(createCard, {
      loading: "Processing...",
      success: (newCard: Card) => {
        setCards(cardService.addCard(newCard, cards));
        return "Create card succeed";
      },
      error: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == HttpStatusCode.Conflict) {
            return "Add card failed: license plate conflict";
          }
        }
        return "Add card failed";
      },
    });
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
