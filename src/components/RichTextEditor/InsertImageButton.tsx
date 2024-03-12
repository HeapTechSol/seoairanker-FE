import React, { useRef } from "react";
import Button from "../Button";

import { InsertImageButtonProps } from "./types";

const InsertImageButton = ({ button, addImage }: InsertImageButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <React.Fragment>
      <Button
        borderRadius
        variant="filled"
        size="md"
        onClick={() => fileInputRef.current?.click()}
        id={button?.id}
      >
        <i className={button.buttonIcon}></i>
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={addImage}
      />
    </React.Fragment>
  );
};

export default InsertImageButton;
