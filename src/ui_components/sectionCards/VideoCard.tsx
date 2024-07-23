/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { Text } from "@create-figma-plugin/ui";
import { useEffect, useState } from "preact/hooks";
import { videoTextBoxElement } from "../textBoxForLinksElement";
import youtube from "../../images/youtube.svg";
import { IconX, IconInfoCircle } from "@tabler/icons-react";

const videoCard = (
  foundVideoData: any,
  selectedVideo: number,
  setFoundVideoData: any,
  setSelectedVideo: any,
  setSelectedVideoContent: any,
  setVideoDataElements: any,
  setVideoLink: any,
  videoDataElements: any,
  videoLink: string
) => {
  const [isValid, setIsValid]: any = useState(true);
  const VideoElementCard = ({
    element,
    name,
    video,
    thumbnail,
    index,
    selectedVideo,
    setSelectedVideo,
    setSelectedVideoContent,
  }: {
    element: any; // replace ElementType with the actual type
    name: string;
    video: string;
    thumbnail: string;
    index: number;
    selectedVideo: number;
    setSelectedVideo: (value: number) => void;
    setSelectedVideoContent: (value: any) => void; // replace VideoContent with the actual type
  }) => {
    const isSelected = index === selectedVideo;

    const cardStyle = {
      width: "100%",
      display: "flex",
      gap: "8px",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "8px",
      borderRadius: "8px",
      backgroundColor: isSelected ? "#5B9598" : "#f5f5f5",
      cursor: "pointer",
    };
    return (
      <div
        style={cardStyle}
        onClick={() => {
          const videoTemp = video.replace("embed/", "watch?v=");
          window.open(videoTemp, "_blank");
        }}
      >
        <img style={{ height: "80px" }} src={thumbnail} alt={name} />
        <Text style={{ color: isSelected ? "#FFF" : "#000" }}>{name}</Text>
      </div>
    );
  };

  useEffect(() => {
    if (Object.keys(foundVideoData).length > 0) {
      setVideoDataElements([foundVideoData, ...videoDataElements]);
    }
  }, [foundVideoData]);

  const handleDeleteVideo = (index: number) => {
    const newVideoDataElements = [...videoDataElements];
    newVideoDataElements.splice(index, 1);
    setVideoDataElements(newVideoDataElements);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "8px",
          height: "100%",
          width: "100%",
        }}
      >
        <h4 className={"inputLabel"}>Add link to YouTube video:</h4>
        <div className="videoInputRowWithValidation">
          <div className="videoInputRow">
            <img src={youtube} />
            <div className={"videoInfo"}>
              <IconInfoCircle />
            </div>
            {videoTextBoxElement(
              videoLink,
              setVideoLink,
              "Paste YouTube URL, Enter to add",
              "videoLink",
              setFoundVideoData,
              false,
              setIsValid
            )}
          </div>
          <div
            className={"validationFailedMessage"}
            style={
              isValid || videoLink.length === 0
                ? { opacity: 0 }
                : { opacity: 1 }
            }
          >
            Invalid YouTube link I
          </div>
        </div>
        {videoDataElements.map((videoDataElement: any, index: number) => {
          return (
            <div className="videoElementWrapper">
              <VideoElementCard
                element={videoDataElement.element}
                name={videoDataElement.name}
                video={videoDataElement.video}
                thumbnail={videoDataElement.thumbnail}
                index={index}
                selectedVideo={selectedVideo}
                setSelectedVideo={setSelectedVideo}
                setSelectedVideoContent={setSelectedVideoContent}
              />
              <button onClick={() => handleDeleteVideo(index)}>
                <IconX />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default videoCard;
