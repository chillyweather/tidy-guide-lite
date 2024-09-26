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
    properties: DocumentationElement;
    variants: DocumentationElement;
    paragraph: DocumentationElement;
    dosAndDonts: DocumentationElement;
    list: DocumentationElement;
    links: DocumentationElement;
    image: DocumentationElement;
  };
}
