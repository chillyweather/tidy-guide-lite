import { h, FunctionComponent } from "preact";
import { TagLabel, TagLine } from "../../tagPreviewElements";
import { LabelType } from "./CanvasAppearance";

interface TagPreviewProps {
  tagColor: string;
  labelType: LabelType;
  lineType: "Solid" | "Dash";
  tagLabelText: string;
}

const TagPreview: FunctionComponent<TagPreviewProps> = ({
  tagColor,
  labelType,
  lineType,
  tagLabelText,
}) => {
  return (
    <div className="tag-preview-frame">
      <div className="tag-preview">
        <TagLabel label={tagLabelText} color={tagColor} shape={labelType} />
        <TagLine color={tagColor} type={lineType} />
      </div>
    </div>
  );
};

export default TagPreview;
