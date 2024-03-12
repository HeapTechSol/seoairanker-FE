import ButtonList from "./ButtonList";
import ColorsSelection from "./ColorsSelection";
import FormattingSelection from "./FormattingSelection";

import useRichTextEditorInteractions from "@/hooks/useRichTextEditorInteractions";

const RichTextToolbar = () => {
  
  const { formatDoc, addLink, addImage } = useRichTextEditorInteractions();

  return (
    <div className="toolbar">
      <div className="head">
        <FormattingSelection formatDoc={formatDoc} />
        <ColorsSelection formatDoc={formatDoc} />
      </div>
      <ButtonList addLink={addLink} formatDoc={formatDoc} addImage={addImage} />
    </div>
  );
};

export default RichTextToolbar;
