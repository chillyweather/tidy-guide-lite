/* eslint-disable @typescript-eslint/no-explicit-any */
function makeDraggable(event: any) {
  //why the fuck i did this?
  event.target.parentElement.parentElement.parentElement.parentElement.setAttribute(
    "draggable",
    true
  );
}
function removeDraggable(event: any) {
  event.target.parentElement.parentElement.parentElement.parentElement.setAttribute(
    "draggable",
    false
  );
}

function fillDosAndDontsInputs(
  responseArray: string[],
  items: string[],
  setItems: (arr: string[]) => void
) {
  if (responseArray && responseArray.length > 0) {
    if (!items || !items.length) {
      setItems(responseArray);
    } else {
      setItems([...items, ...responseArray]);
    }
  }
}

export { makeDraggable, removeDraggable, fillDosAndDontsInputs };
