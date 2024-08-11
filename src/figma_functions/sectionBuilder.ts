/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  buildLinkText,
  buildText,
  buildListText,
  buildImageFromRemoteSource,
  buildTwoColumns,
} from "src/figma_doc_sections/elementBuildingFunctions";
import { buildAnatomySection } from "src/figma_doc_sections/buildAnatomySection";
import { buildReleaseNotes } from "src/figma_doc_sections/buildReleaseNotes";
import { buildSpacingSection } from "src/figma_doc_sections/buildSpacingSection";
import { buildPropSection } from "src/figma_doc_sections/buildPropSection";
import { buildVarSection } from "src/figma_doc_sections/buildVarSection";
import { buildAnatomySpacings } from "./buildAnatomySpacings";

async function buildSection(
  element: any,
  sectionFrame: any,
  currentNode: any = null,
  appSettings: any
) {
  const content = element.content;
  switch (element.datatype) {
    case "anatomy":
      buildAnatomySection(
        currentNode,
        sectionFrame,
        element.content.anatomyIndexPosition,
        element.content.anatomyIndexSpacing,
        appSettings
      );
      break;

    case "spacing":
      await buildSpacingSection(currentNode, sectionFrame, appSettings);
      const isInternalSpacing = element.content.isInternalSpacing;
      if (isInternalSpacing) {
        await buildAnatomySpacings(currentNode, sectionFrame);
      }
      break;

    case "property":
      buildPropSection(currentNode, sectionFrame);
      break;

    case "variants":
      buildVarSection(currentNode, sectionFrame);
      break;

    case "link":
      const inputs = content.sources;
      const linkIsEmpty =
        inputs.length === 1 && inputs[0].link === "" && inputs[0].source === "";
      if (!inputs.length || linkIsEmpty) return;
      inputs.forEach((input: any) => {
        const link = buildLinkText(input.source, input.link);
        sectionFrame.appendChild(link);
      });
      break;

    case "release-notes":
      buildReleaseNotes(sectionFrame);
      break;

    case "text":
      const text = element.text;
      if (text) {
        const textFrame = buildText(text);
        sectionFrame.appendChild(textFrame);
        textFrame.layoutSizingHorizontal = "FILL";
      }
      break;

    case "two-columns":
      buildTwoColumns(element, sectionFrame);
      break;

    case "list":
      const list = content.inputs.join("\n");
      if (list.length) {
        const listFrame = buildListText(list, content.listType);
        sectionFrame.appendChild(listFrame);
        listFrame.layoutSizingHorizontal = "FILL";
      }
      break;

    case "image":
      if (content.remoteImageLink.lenght === 0) {
        return;
      } else {
        const imageLink = content.remoteImageLink;
        const image = await buildImageFromRemoteSource(imageLink);
        sectionFrame.appendChild(image);
      }
      break;

    case "video":
      const videoDataElements = content.videoDataElements;
      for (const videoDataElement of videoDataElements) {
        const textVideo = videoDataElement.name;
        const linkVideo = videoDataElement.video;
        if (!textVideo || !linkVideo) return;
        const videoFrame = buildLinkText(textVideo, linkVideo);
        sectionFrame.appendChild(videoFrame);
      }
      break;
    default:
      throw new Error(
        "Error: No datatype found for this section. Please check the section data."
      );
  }
}

export default buildSection;
