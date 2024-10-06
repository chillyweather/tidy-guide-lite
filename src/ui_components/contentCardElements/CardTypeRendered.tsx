// export const currentCardContent = (cardType: string) => {
//   if (cardType === "header") {
//     return <HeaderCard />;
//   } else if (cardType === "property") {
//     return <PropertyCard />;
//   } else if (cardType === "variants") {
//     return <VariantsCard />;
//   } else if (cardType === "anatomy") {
//     return (
//       <AnatomyCard
//         anatomyIndexPosition={anatomyIndexPosition}
//         setAnatomyIndexPosition={setAnatomyIndexPosition}
//         anatomyIndexSpacing={anatomyIndexSpacing}
//         setAnatomyIndexSpacing={setAnatomyIndexSpacing}
//       />
//     );
//   } else if (cardType === "spacing") {
//     return <SpacingsCard />;
//   } else if (cardType === "release-notes") {
//     return (
//       <ReleaseNotesCard
//         setReleaseNotesComment={setReleaseNotesMessage}
//         releaseNotesComment={releaseNotesMessage}
//         setReleaseNotesDate={setReleaseNotesDate}
//       />
//     );
//   } else if (cardType === "text") {
//     return (
//       <TextCard
//         textContent={paragraphTextContent}
//         setTextContent={setParagraphTextContent}
//       />
//     );
//   } else if (cardType === "two-columns") {
//     return (
//       <TwoColumnCard
//         leftTitle={leftTitle}
//         setLeftTitle={setLeftTitle}
//         leftItems={leftItems}
//         setLeftItems={setLeftItems}
//         rightTitle={rightTitle}
//         setRightTitle={setRightTitle}
//         rightItems={rightItems}
//         setRightItems={setRightItems}
//       />
//     );
//   } else if (cardType === "list") {
//     return <ListCard listItems={listItems} setListItems={setListItems} />;
//   } else if (cardType === "link") {
//     return <LinkCard sources={sources} setSources={setSources} />;
//   } else if (cardType === "image") {
//     return (
//       <ImageCard
//         remoteImageLink={remoteImageLink}
//         setRemoteImageLink={setRemoteImageLink}
//       />
//     );
//   } else {
//     return null;
//   }
// };
