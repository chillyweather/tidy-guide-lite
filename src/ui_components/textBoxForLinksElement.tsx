import { h, JSX } from "preact";
import { setVideoDataElements } from "./ui_functions/getVideoDetails";
import normalizeYoutubeLink from "./ui_functions/normalizeYoutubeLink";

export function videoTextBoxElement(
  value: string,
  setValue: (value: string) => void,
  placeholder = "Title",
  type?: string,
  callback?: () => void,
  isDisabled: boolean = false,
  setIsValid?: (value: boolean) => void
) {
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    if (type === "videoLink") {
      const newValue = event.currentTarget.value;
      setValue(normalizeYoutubeLink(newValue) || "");
      if (isValidYouTubeLink(newValue)) {
        setIsValid!(true);
      } else {
        setIsValid!(false);
      }
    } else {
      const newValue = event.currentTarget.value;
      setValue(newValue);
    }
  }

  function runCallback(type: string | undefined) {
    switch (type) {
      case "videoLink":
        if (isValidYouTubeLink(value)) {
          setVideoDataElements(value, callback);
          setValue("");
        } else {
          setIsValid!(false);
        }
        break;
      case "link":
        if (callback) callback();
        break;
      default:
        break;
    }
  }

  function isValidYouTubeLink(link: string): boolean {
    const cleanedLink = normalizeYoutubeLink(link);
    if (!cleanedLink) return false;
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
    return youtubeRegex.test(cleanedLink);
  }

  return (
    <div className="inputWithValidation">
      <input
        onInput={handleInput}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            runCallback(type);
          }
        }}
        placeholder={placeholder}
        value={value}
        className={"dialogInput listInputStyle"}
        disabled={isDisabled}
      />
    </div>
  );
}
