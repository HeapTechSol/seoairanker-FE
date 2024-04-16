import { useRef } from "react";

import RichTextToolbar from "./RichTextToolbar";

import "./RichTextEditor.scss";

const RichTextEditor = () => {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rich-text-editor">
      <div className="rich-text-editor-container">
        <RichTextToolbar />
        <div
          id="content"
          contentEditable
          spellCheck={false}
          ref={contentEditableRef}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
