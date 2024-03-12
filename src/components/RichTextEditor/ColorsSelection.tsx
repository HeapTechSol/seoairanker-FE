import { RichTextEditorFunctionTypes } from "./types";

const ColorsSelection = ({formatDoc}:RichTextEditorFunctionTypes) => {
  return (
    <>
      <div className="color">
        <span>Color</span>
        <input
          type="color"
          onChange={(e) => formatDoc?.("foreColor", e.target.value)}
        />
      </div>
      <div className="color">
        <span>Background</span>
        <input
          type="color"
          onChange={(e) => formatDoc?.("hiliteColor", e.target.value)}
        />
      </div>
    </>
  );
};

export default ColorsSelection;
