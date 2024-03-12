import { ChangeEvent } from "react";

export type RichTextEditorFunctionTypes = {
  addLink?: () => void;
  addImage?: (event:ChangeEvent<HTMLInputElement>) => void;
  formatDoc?: (key: string, value?: string | null) => void;
};

export type ButtonListTypes = {
  buttonAction: string;
  buttonIcon: string;
  id?: string;
};

export type InsertImageButtonProps = {
  button: ButtonListTypes;
  addImage?: (event:ChangeEvent<HTMLInputElement>) => void;
};
