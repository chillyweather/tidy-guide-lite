import { getDate } from "../figma_functions/getDate";
import { buildAutoLayoutFrame } from "../figma_functions/utilityFunctions";

const date = getDate();

export function buildReleaseNotes(parentFrame: FrameNode) {
  const releaseNotes = buildAutoLayoutFrame(
    "release-notes",
    "VERTICAL",
    0,
    0,
    0
  );

  const titleRow = buildRow("Date", "Version", "Details", {
    family: "Inter",
    style: "Bold",
  });
  const firstRow = buildRow(date, "1.0.0", "Initial release", {
    family: "Inter",
    style: "Regular",
  });
  releaseNotes.appendChild(titleRow);
  releaseNotes.appendChild(firstRow);
  titleRow.layoutSizingHorizontal = "FILL";
  firstRow.layoutSizingHorizontal = "FILL";

  parentFrame.appendChild(releaseNotes);
  releaseNotes.layoutSizingHorizontal = "FILL";
}

function buildRow(
  dateString: string = date,
  versionString: string = "1.0.0",
  detailsString: string = "Initial release",
  fontName: FontName = { family: "Inter", style: "Regular" }
) {
  const row = buildAutoLayoutFrame("title-row", "HORIZONTAL", 0, 0, 0);
  const dateCell = buildAutoLayoutFrame("date-cell", "HORIZONTAL", 0, 0, 0);
  dateCell.paddingBottom = 12;
  dateCell.paddingTop = 12;
  dateCell.paddingLeft = 12;
  dateCell.paddingRight = 12;
  const versionCell = dateCell.clone();
  const detailsCell = dateCell.clone();

  const dateText = figma.createText();
  dateText.characters = dateString;
  dateText.fontSize = 14;
  dateText.fontName = fontName;
  const versionText = dateText.clone();
  versionText.characters = versionString;
  const detailsText = dateText.clone();
  detailsText.characters = detailsString;

  dateCell.appendChild(dateText);
  versionCell.appendChild(versionText);
  detailsCell.appendChild(detailsText);

  row.appendChild(dateCell);
  row.appendChild(versionCell);
  row.appendChild(detailsCell);

  dateCell.resize(100, dateCell.height);
  versionCell.resize(80, versionCell.height);
  detailsCell.layoutSizingHorizontal = "FILL";
  row.strokes = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.8291666507720947,
        g: 0.8291666507720947,
        b: 0.8291666507720947,
      },
      boundVariables: {},
    },
  ];
  row.strokeBottomWeight = 1;

  return row;
}
