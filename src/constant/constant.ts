export const COOKIES_EXPIRATION_TIME = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000
);
export const COOKIES_SECRET_KEY = "overcomeX";

export const EMAIL_DELIVERY_CONFIRMATION = (email: string) =>
  `We have sent an OTP to your email ${
    email || ""
  }, Please verify your account to proceed`;

export const toolbarButtonList = [
  { buttonAction: "undo", buttonIcon: "bx bx-undo" },
  { buttonAction: "redo", buttonIcon: "bx bx-redo" },
  { buttonAction: "bold", buttonIcon: "bx bx-bold" },
  { buttonAction: "underline", buttonIcon: "bx bx-underline" },
  { buttonAction: "italic", buttonIcon: "bx bx-italic" },
  { buttonAction: "strikeThrough", buttonIcon: "bx bx-strikethrough" },
  { buttonAction: "justifyLeft", buttonIcon: "bx bx-align-left" },
  { buttonAction: "justifyCenter", buttonIcon: "bx bx-align-middle" },
  { buttonAction: "justifyRight", buttonIcon: "bx bx-align-right" },
  { buttonAction: "justifyFull", buttonIcon: "bx bx-align-justify" },
  { buttonAction: "insertOrderedList", buttonIcon: "bx bx-list-ol" },
  { buttonAction: "insertUnorderedList", buttonIcon: "bx bx-list-ul" },
  { buttonAction: "addLink", buttonIcon: "bx bx-link" },
  { buttonAction: "unlink", buttonIcon: "bx bx-unlink" },
  { buttonAction: "showCode", buttonIcon: "bx bx-code", id:'show-code' },
  { buttonAction: "insertImage", buttonIcon: "bx bx-image" },
];

export const toolbarSelectsOptionsList = {
  headingOptions: [
    { value: "", text: "Select Heading", hidden: true },
    { value: "h1", text: "Heading 1" },
    { value: "h2", text: "Heading 2" },
    { value: "h3", text: "Heading 3" },
    { value: "h4", text: "Heading 4" },
    { value: "h5", text: "Heading 5" },
    { value: "h6", text: "Heading 6" },
    { value: "p", text: "Paragraph" }
  ],
  fontSizeOptions: [
    { value: "", text: "Select Font Size", hidden: true },
    { value: "1", text: "Extra small" },
    { value: "2", text: "Small" },
    { value: "3", text: "Regular" },
    { value: "4", text: "Medium" },
    { value: "5", text: "Large" },
    { value: "6", text: "Extra Large" },
    { value: "7", text: "Big" }
  ]
};

export const DOTS = '...';
