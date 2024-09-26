type Alignment = "FILL" | "HUG" | "FIXED" | null;
type Direction = "VERTICAL" | "HORIZONTAL" | null;
interface BaseElement {
  name?: string;
  direction?: Direction;
  alignHorizontal?: Alignment;
  alignVertical?: Alignment;
  elements?: Record<string, DocumentationElement>;
}
interface DocumentationElement extends BaseElement {
  [key: string]: unknown;
}
export interface Documentation extends BaseElement {
  elements: {
    header: DocumentationElement;
    anatomy: DocumentationElement;
    spacing: DocumentationElement;
    property: DocumentationElement;
    variants: DocumentationElement;
    text: DocumentationElement;
    "two-columns": DocumentationElement;
    list: DocumentationElement;
    link: DocumentationElement;
    image: DocumentationElement;
  };
}
