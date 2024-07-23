export function scrollListPrev(e: any) {
  e.target.parentElement.parentElement.parentElement.parentElement
    .getElementsByClassName("listWrapper")[0]
    .scrollTo(
      e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "listWrapper"
      )[0].scrollLeft - document.body.offsetWidth,
      0
    );
  e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
    "currentPage"
  )[0].innerText =
    Number(
      e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "currentPage"
      )[0].innerText
    ) - 1;
  checkArrows(e);
}
export function checkArrows(e: any) {
  if (
    e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
      "currentPage"
    )[0].innerText ==
    e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
      "totalPages"
    )[0].innerText
  ) {
    e.target.parentElement.parentElement.parentElement.parentElement
      .getElementsByClassName("btnNext")[0]
      .classList.add("disabled");
  } else {
    e.target.parentElement.parentElement.parentElement.parentElement
      .getElementsByClassName("btnNext")[0]
      .classList.remove("disabled");
  }

  if (
    e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
      "currentPage"
    )[0].innerText == 1
  ) {
    e.target.parentElement.parentElement.parentElement.parentElement
      .getElementsByClassName("btnPrev")[0]
      .classList.add("disabled");
  } else {
    e.target.parentElement.parentElement.parentElement.parentElement
      .getElementsByClassName("btnPrev")[0]
      .classList.remove("disabled");
  }
}
export function scrollListNext(e: any) {
  e.target.parentElement.parentElement.parentElement.parentElement
    .getElementsByClassName("listWrapper")[0]
    .scrollTo(
      e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "listWrapper"
      )[0].scrollLeft + document.body.offsetWidth,
      0
    );
  e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
    "currentPage"
  )[0].innerText =
    Number(
      e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "currentPage"
      )[0].innerText
    ) + 1;
  checkArrows(e);
}
