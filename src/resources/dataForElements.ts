const content = {
  subtitle1: "",
  subtitle2: "",
  text1: "",
  text2: "",
  inputs: [""],
  remoteImageLink: "",
  sources: [
    {
      source: "",
      link: "",
    },
  ],
  releaseNotesMessage: "",
  releaseNotesDate: "",
  currentAuthor: "",
  currentDocument: "",
  currentPage: "",
  videoDataElements: [],
};

const PDSectionData = [
  {
    title: "Anatomy",
    content: content,
    datatype: "anatomy",
    description:
      "Get all of your s**t in order: typography, color palettes, spacing, icons and other design elements.",
    data: [],
    id: "0",
    docId: "0",
    repeatable: false,
    publish: true,
  },
  {
    title: "Spacing",
    content: content,
    datatype: "spacing",
    description:
      "Standardizing spacing enhances design consistency and user experience.",
    data: [],
    id: "0",
    docId: "0",
    repeatable: false,
    publish: true,
  },
  {
    title: "Property",
    content: content,
    datatype: "property",
    description:
      "Auto guidelines for designing and maintaining properties with consistency and efficiency",
    data: [],
    id: "0",
    docId: "0",
    repeatable: false,
    publish: true,
  },
  {
    title: "Variants",
    content: content,
    datatype: "variants",
    description:
      "Effortlessly showcase all your variations and attributes with a single click. Tidy generates missing variants on-the-go.",
    data: [],
    id: "0",
    docId: "0",
    repeatable: false,
    publish: true,
  },
  // {
  //   title: "Tokens (Coming Soon)",
  //   content: content,
  //   datatype: "tokens",
  //   description:
  //     "Centralize design decisions effortlessly with a repository, pointing to style values like colors, fonts, and measurements.",
  //   data: [],
  //   id: "0",
  //   docId: "0",
  //   repeatable: false,
  //   publish: false,
  // },
  // {
  //   title: "Release Notes",
  //   content: content,
  //   datatype: "release-notes",
  //   description: "Five is right out.",
  //   data: [],
  //   id: "0",
  //   docId: "0",
  //   repeatable: false,
  //   publish: true,
  // },
];

const sectionData = [
  {
    title: "Paragraph",
    content: content,
    datatype: "text",
    description:
      "Once the number three, being the third number, be reached, then lobbest thou thy Holy Hand Grenade of Antioch towards thy foe, who, being naughty in My sight, shall snuff it.",
    data: [],
    id: "0",
    docId: "0",
    repeatable: true,
    publish: true,
  },
  {
    title: "Two Columns",
    content: content,
    datatype: "two-columns",
    description:
      "And Saint Attila raised the hand grenade up on high, saying, 'O Lord, bless this thy hand grenade, that with it thou mayst blow thine enemies to tiny bits, in thy mercy.",
    data: [],
    id: "0",
    docId: "0",
    repeatable: true,
    publish: true,
  },
  // {
  //   title: "Do's and Dont's",
  //   content: content,
  //   datatype: "dos-donts",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   data: [],
  //   id: "0",
  //   docId: "0",
  //   repeatable: true,
  //   publish: true,
  // },
  {
    title: "List",
    content: content,
    datatype: "list",
    description: "And the Lord did grin.",
    data: [],
    id: "0",
    docId: "0",
    repeatable: true,
    publish: true,
  },
  {
    title: "Link",
    content: content,
    datatype: "link",
    description:
      "And the people did feast upon the lambs and sloths, and carp and anchovies, and orangutans and breakfast cereals, and fruit-bats and large chu...",
    data: [],
    id: "0",
    docId: "0",
    repeatable: true,
    publish: true,
  },
  {
    title: "Image",
    content: content,
    datatype: "image",
    description:
      "And the Lord spake, saying, 'First shalt thou take out the Holy Pin. Then shalt thou count to three, no more, no less.",
    data: [],
    id: "0",
    docId: "0",
    repeatable: true,
    publish: true,
  },
  // {
  //   title: "Video",
  //   content: content,
  //   datatype: "video",
  //   description:
  //     "Three shall be the number thou shalt count, and the number of the counting shall be three.",
  //   data: [],
  //   id: "0",
  //   docId: "0",
  //   repeatable: true,
  //   publish: true,
  // },
];

export { sectionData, PDSectionData };
