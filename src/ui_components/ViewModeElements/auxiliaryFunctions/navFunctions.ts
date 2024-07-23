import { emit } from "@create-figma-plugin/utilities";

type Direction = "next" | "prev";

const findText = (direction: string) => {
  const searchInput = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value;

  const searchDirection = direction === "next" ? false : true;

  if ((window as any).find) {
    (window as any).find(searchInput, false, searchDirection);
  }
};

function closeMenu() {
  let headerMenu = document.getElementById("headerMenu");
  let searchMenu = document.getElementById("searchMenu");
  let textDetails = document.getElementById("textDetails");

  if (headerMenu) {
    headerMenu.removeAttribute("open");
  }
  if (searchMenu) {
    searchMenu.removeAttribute("open");
  }
  if (textDetails) {
    textDetails.removeAttribute("open");
  }
}

async function changeText(event: Event) {
  document
    .querySelector(":root")!
    //@ts-ignore
    .style.setProperty("--text-size", event.target!.value + "px");
  //@ts-ignore
  emit("SET_TEXT_SIZE", event.target!.value, event.target!.id);
  //@ts-ignore
}

function checkTop(setIsTop: Function) {
  const top = document.getElementById("top");
  if (!top) return;
  if (document.body.scrollTop == 0) {
    // top.style.opacity = "0";
    setIsTop(true);
  } else {
    // top.style.opacity = "1";
    setIsTop(false);
  }
  setTimeout(function () {
    checkTop(setIsTop);
  }, 500);
}

export { findText, closeMenu, checkTop, changeText };
