/* eslint-disable @typescript-eslint/no-explicit-any */
export const openSection = (
  e: MouseEvent,
  id: string,
  selectedCard: string,
  setSelectedCard: (cardId: string) => void
) => {
  e.stopPropagation();
  if (selectedCard === id) {
    setSelectedCard("");
  } else {
    setSelectedCard(id);
  }
};

export const deleteSection = (index: number, setSelectedSections: any) => {
  setSelectedSections((prevSections: any[]) => {
    const newSections = Array.from(prevSections);
    newSections.splice(index, 1);
    return newSections;
  });
};

export const duplicateSection = (
  e: MouseEvent,
  index: number,
  cardData: any,
  setSelectedSections: (
    sections: any[] | ((prevSections: any[]) => any[])
  ) => void
) => {
  e.stopPropagation();
  setSelectedSections((prevSections: any[]) => {
    const newSections = Array.from(prevSections);
    const newSection = { ...cardData };
    newSection.id = Math.random().toString(36).substring(2, 9);
    newSection.docId = Math.random().toString(36).substring(2, 9);
    newSections.splice(index + 1, 0, newSection);
    return newSections;
  });
};
