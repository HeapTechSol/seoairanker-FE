import { toolbarSelectsOptionsList } from "@/constant/constant";
import { RichTextEditorFunctionTypes } from "./types";

const FormattingSelection = ({ formatDoc }: RichTextEditorFunctionTypes) => {
  return (
    <>
      <select onChange={(e) => formatDoc?.("formatBlock", e.target.value)}>
        {toolbarSelectsOptionsList.headingOptions.map((option, index) => (
          <option key={`${index}-select-heading`} value={option.value} hidden={option.hidden}>
            {option.text}
          </option>
        ))}
      </select>
      <select onChange={(e) => formatDoc?.("fontSize", e.target.value)}>
        {toolbarSelectsOptionsList.fontSizeOptions.map((option, index) => (
          <option key={`${index}-select-fontSize`} value={option.value} hidden={option.hidden}>
            {option.text}
          </option>
        ))}
      </select>
    </>
  );
};

export default FormattingSelection;
