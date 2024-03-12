import { classMapper } from "@/utils/helper";

import { TruncateTextTypes } from "./types";

import "./TruncateText.scss";

const TruncateText = ({ text, width, line }: TruncateTextTypes) => {
  const classes = classMapper("truncate-text", { [`line-${line}`]: !!line });
  const style = { width: line ? `${width}px` : "auto" };

  return (
      <div className={classes} style={style}>
        {text}
      </div>
  );
};

export default TruncateText;
