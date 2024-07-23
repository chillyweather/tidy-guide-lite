import { h } from "preact";

interface TagLabelProps {
  label: string;
  color: string;
  shape: "round" | "square" | "square-rounded" | "square-rounded-rotated";
}

const getShapeStyles = (shape?: string) => {
  switch (shape) {
    case "round":
      return { borderRadius: "50%" };
    case "square-rounded":
      return { borderRadius: "10px" };
    case "square-rounded-rotated":
      return { borderRadius: "10px", transform: "rotate(45deg)" };
    default:
      return {};
  }
};

export const TagLabel = ({ label, color, shape }: TagLabelProps) => {
  const shapeStyles = getShapeStyles(shape);

  return (
    <div
      className="tag-label"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60px",
        height: "60px",
        backgroundColor: color,
        ...shapeStyles,
      }}
    >
      <p
        style={{
          margin: "0",
          padding: "0",
          color: "white",
          fontSize: "34px",
          fontWeight: "600",
          transform:
            shape === "square-rounded-rotated" ? "rotate(-45deg)" : "none",
        }}
      >
        {label}
      </p>
    </div>
  );
};

interface TagLineProps {
  color: string;
  type?: "Solid" | "Dash";
}

export const TagLine = ({ color, type = "Solid" }: TagLineProps) => {
  if (type === "Dash") {
    const dashes = Array.from({ length: 16 }, (_, i) => (
      <div
        key={i}
        style={{
          width: "100%",
          height: "8px",
          backgroundColor: color,
          marginBottom: i !== 15 ? "3px" : undefined,
        }}
      />
    ));

    return (
      <div
        className="tag-line"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "3.2px",
          height: "124px",
        }}
      >
        {dashes}
      </div>
    );
  }

  return (
    <div
      className="tag-line"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "3.2px",
        height: "124px",
        backgroundColor: color,
      }}
    />
  );
};
