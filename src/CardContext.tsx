import { useContext, useState } from "preact/hooks";
import { createContext } from "preact";
import { h } from "preact";

interface Card {
  id: number;
  data: any;
}

interface CardContextProps {
  cards: Card[];
  addCard: (cardData: any) => void;
  updateCard: (cardId: number, newCardData: any) => void;
  deleteCard: (cardId: number) => void;
}

const CardContext = createContext<CardContextProps>({
  cards: [],
  addCard: () => {},
  updateCard: () => {},
  deleteCard: () => {},
});

export const useCards = (): CardContextProps => useContext(CardContext);

export const CardProvider = ({ children }: { children: any }) => {
  const [cards, setCards] = useState<Card[]>([]);

  // Add a card
  const addCard = (cardData: any) => {
    setCards((prevCards) => [...prevCards, { id: Date.now(), data: cardData }]);
  };

  // Update a card
  const updateCard = (cardId: number, newCardData: any) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, data: newCardData } : card
      )
    );
  };

  // Delete a card
  const deleteCard = (cardId: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <CardContext.Provider value={{ cards, addCard, updateCard, deleteCard }}>
      {children}
    </CardContext.Provider>
  );
};
