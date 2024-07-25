/* eslint-disable @typescript-eslint/no-explicit-any */
import ElementSection from "./ElementSection";
import { useEffect, useState } from "preact/hooks";
import { useAtom } from "jotai";
import {
  currentPageAtom,
  dataForUpdateAtom,
  selectedMasterIdAtom,
} from "src/state/atoms";
import { h } from "preact";
const DetailsPage = () => {
  const [selectedMasterId] = useAtom(selectedMasterIdAtom);
  const [data]: any = useAtom(dataForUpdateAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  const [docData, setDocData]: any = useState(null);
  const [navigationLinks, setNavigationLinks]: any = useState([]);

  useEffect(() => {
    setCurrentPage("details");
  }, []);

  useEffect(() => {
    if (data) {
      const currentData = data.find(
        (item: any) => item.nodeId === selectedMasterId
      );
      setDocData(currentData);
    }
  }, [data]);

  useEffect(() => {
    if (docData) {
      if (selectedMasterId.length > 0) {
        const data = docData.docs;
        const keys = Object.keys(data);
        const newLinks = keys.reduce((links, key, index) => {
          const element: any = data[key];
          if (
            element.datatype &&
            !(
              element.datatype === "anatomy" ||
              element.datatype === "spacing" ||
              element.datatype === "property" ||
              element.datatype === "variants"
            ) &&
            element.publish &&
            !element.hidden &&
            element.datatype !== "header"
          ) {
            links.push([element.title, index]);
          }
          return links;
        }, [] as any[]);
        setNavigationLinks(newLinks);
      }
    }
  }, [docData, selectedMasterId]);

  return (
    <div className="viewer-data-wrapper">
      {docData && (
        <div className={"section headerSection"}>
          <div className="title-wrapper">
            <strong>
              <h1 id={"sectionHeader"}>{docData.title}</h1>
            </strong>
          </div>
          <div className={"nav-wrapper"}>
            <div className={"nav-container"}>
              <p>On this page</p>
              <h1 className={"subtitle"}>{docData.title}</h1>
              <nav className={"navigation"}>
                {buildNavigationLinks(navigationLinks)}
              </nav>
            </div>
          </div>
        </div>
      )}
      {docData &&
        docData.docs &&
        docData.docs.map((element: any, index: number) => {
          if (
            element.publish &&
            element.datatype !== "release-notes" &&
            !element.hidden
          ) {
            return ElementSection({
              element,
              index,
              navigationLinks,
            });
          }
        })}
    </div>
  );
};

function buildNavigationLinks(arr: any[]) {
  return arr.map((element: any[]) => {
    return (
      <a className={"link"} href={"#" + element[0] + element[1]}>
        {element[0]}
      </a>
    );
  });
}

export default DetailsPage;
