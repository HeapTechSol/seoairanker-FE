import Button from "../Button";
import InsertImageButton from "./InsertImageButton";

import { toolbarButtonList } from "@/constant/constant";

import { RichTextEditorFunctionTypes } from "./types";

const ButtonList = ({
  addLink,
  formatDoc,
  addImage,
}: RichTextEditorFunctionTypes) => {
  return (
    <div className="btn-toolbar">
      {toolbarButtonList.map((button, index) => (
        <>
          {button.buttonAction === "insertImage" ? (
            <InsertImageButton addImage={addImage} button={button} />
          ) : (
            <Button
              borderRadius
              variant="filled"
              key={`${index}-button`}
              size="md"
              onClick={() => {
                button.buttonAction === "addLink"
                  ? addLink?.()
                  : formatDoc?.(button.buttonAction);
              }}
              id={button?.id}
            >
              <i className={button.buttonIcon}></i>
            </Button>
          )}
        </>
      ))}
    </div>
  );
};

export default ButtonList;
