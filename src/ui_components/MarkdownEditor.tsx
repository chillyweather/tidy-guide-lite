//@ts-nocheck
import { h } from "preact";
import { useState, useRef } from "preact/hooks";

const MyMarkdownEditor = () => {
  const [content, setContent] = useState("");
  const inputRef = useRef(null);

  const applyFormatting = (tag) => {
    const input = inputRef.current;
    if (!input) return;

    const { selectionStart, selectionEnd } = input;
    const selectedText = content.substring(selectionStart, selectionEnd);

    const formattedText = `**${selectedText}**`;
    const newContent =
      content.substring(0, selectionStart) +
      formattedText +
      content.substring(selectionEnd);

    setContent(newContent);
  };

  const handlePreview = () => {
    // For demonstration purposes, apply basic styles here
    inputRef.current.innerHTML = content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.*?)__/g, "<u>$1</u>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  };

  return (
    <div>
      <div>
        <button onClick={() => applyFormatting("**")}>Bold</button>
        <button onClick={() => applyFormatting("__")}>Underline</button>
        <button onClick={() => applyFormatting("*")}>Italic</button>
        <button onClick={handlePreview}>Preview</button>
      </div>
      <textarea
        ref={inputRef}
        value={content}
        onInput={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "200px", marginTop: "10px" }}
      ></textarea>
      <div style={{ marginTop: "10px" }}>
        <h3>Preview</h3>
        <div ref={inputRef}></div>
      </div>
    </div>
  );
};

export default MyMarkdownEditor;
