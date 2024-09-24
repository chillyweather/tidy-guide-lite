type Alignment = "FILL" | "HUG" | "FIXED" | null;
type Direction = "VERTICAL" | "HORIZONTAL" | null;

interface BaseElement {
  direction?: Direction;
  alignHorizontal?: Alignment;
  alignVertical?: Alignment;
  elements?: Record<string, DocumentationElement>;
}

interface DocumentationElement extends BaseElement {
  [key: string]: unknown;
}

interface Documentation extends BaseElement {
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

export const templateDefault: Documentation = {
  direction: "VERTICAL",
  alignHorizontal: null,
  alignVertical: null,
  elements: {
    header: {
      direction: "VERTICAL",
      alignHorizontal: null,
      alignVertical: null,
      elements: {
        title: {
          alignHorizontal: null,
          alignVertical: null,
        },
        elementExample: {},
      },
    },
    anatomy: {
      direction: "VERTICAL",
      alignHorizontal: null,
      alignVertical: null,
      elements: {
        title: {
          alignHorizontal: null,
          alignVertical: null,
        },
        tagFrame: {
          direction: "HORIZONTAL",
          alignHorizontal: null,
          alignVertical: null,
          elements: {
            tagAutoLayoutFrame: {
              direction: "HORIZONTAL",
              alignHorizontal: null,
              alignVertical: null,
              elements: {
                indexes: {
                  direction: "VERTICAL",
                  alignHorizontal: null,
                  alignVertical: null,
                  elements: {
                    indexElement: {},
                  },
                },
                elementTagGroup: {},
              },
            },
          },
        },
      },
    },
    spacing: {
      direction: "VERTICAL",
      alignHorizontal: null,
      alignVertical: null,
      elements: {
        title: {
          alignHorizontal: null,
          alignVertical: null,
        },
        spacingElement: {
          direction: "VERTICAL",
          alignHorizontal: null,
          alignVertical: null,
          elements: {
            sizeTitle: {
              alignHorizontal: null,
              alignVertical: null,
            },
            sizeFrame: {
              alignHorizontal: null,
              alignVertical: null,
            },
          },
        },
      },
    },
    properties: {
      direction: "VERTICAL",
      alignHorizontal: null,
      alignVertical: null,
      elements: {
        title: {
          alignHorizontal: null,
          alignVertical: null,
        },
        frameForSizes: {
          direction: "VERTICAL",
          alignHorizontal: null,
          alignVertical: null,
          elements: {
            title: {
              alignHorizontal: null,
              alignVertical: null,
            },
            allElementsFrame: {
              direction: "HORIZONTAL",
              alignHorizontal: null,
              alignVertical: null,
              elements: {
                sizeElementFrame: {
                  direction: "VERTICAL",
                  alignHorizontal: null,
                  alignVertical: null,
                },
              },
            },
          },
        },
        frameForBooleanProps: {
          direction: "VERTICAL",
          alignHorizontal: null,
          alignVertical: null,
          elements: {
            title: {
              alignHorizontal: null,
              alignVertical: null,
            },
            booleanPropFrame: {
              direction: "VERTICAL",
              alignHorizontal: null,
              alignVertical: null,
            },
          },
        },
      },
    },
    variants: {
      direction: "VERTICAL",
      alignHorizontal: null,
      alignVertical: null,
      elements: {
        title: {
          alignHorizontal: null,
          alignVertical: null,
        },
        variantsFrame: {
          direction: "VERTICAL",
          alignHorizontal: null,
          alignVertical: null,
        },
      },
    },
    paragraph: {
      direction: "VERTICAL",
      alignHorizontal: null,
      alignVertical: null,
      elements: {
        title: {
          alignHorizontal: null,
          alignVertical: null,
        },
        text: {
          alignHorizontal: null,
          alignVertical: null,
        },
      },
    },
    dosAndDonts: {
      direction: "VERTICAL",
      alignHorizontal: null,
      alignVertical: null,
      elements: {
        title: {
          alignHorizontal: null,
          alignVertical: null,
        },
        textWrapper: {
          direction: "VERTICAL",
          alignHorizontal: null,
          alignVertical: null,
          elements: {
            topWrapper: {
              direction: "VERTICAL",
              alignHorizontal: null,
              alignVertical: null,
              elements: {
                title: {
                  alignHorizontal: null,
                  alignVertical: null,
                },
                dndWrapper: {
                  direction: "HORIZONTAL",
                  alignHorizontal: null,
                  alignVertical: null,
                },
              },
            },
            bottomWrapper: {
              direction: "VERTICAL",
              alignHorizontal: null,
              alignVertical: null,
              elements: {
                title: {
                  alignHorizontal: null,
                  alignVertical: null,
                },
                dndWrapper: {
                  direction: "HORIZONTAL",
                  alignHorizontal: null,
                  alignVertical: null,
                },
              },
            },
          },
        },
      },
    },
    list: {
      direction: "VERTICAL",
      alignHorizontal: null,
      alignVertical: null,
      elements: {
        title: {
          alignHorizontal: null,
          alignVertical: null,
        },
        listFrame: {
          direction: "VERTICAL",
          alignHorizontal: null,
          alignVertical: null,
        },
      },
    },
    links: {
      direction: "VERTICAL",
      alignHorizontal: null,
      alignVertical: null,
      elements: {
        title: {
          alignHorizontal: null,
          alignVertical: null,
        },
      },
    },
    image: {
      direction: "VERTICAL",
      alignHorizontal: null,
      alignVertical: null,
      elements: {
        title: {
          alignHorizontal: null,
          alignVertical: null,
        },
      },
    },
  },
};
