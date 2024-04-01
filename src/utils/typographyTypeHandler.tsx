type typographyType = {
  type: string;
  onClick?: () => void;
  text: string | JSX.Element | React.ReactNode;
  typographyCSSClasses: string;
};

export const element = ({
  type,
  text,
  onClick,
  typographyCSSClasses,
}: typographyType) => {
  switch (type) {
    case "body-text":
      return (
        <p onClick={onClick} className={typographyCSSClasses}>
          {text}
        </p>
      );
    case "h1":
      return (
        <h1 onClick={onClick} className={typographyCSSClasses}>
          {text}
        </h1>
      );
    case "h2":
      return (
        <h2 onClick={onClick} className={typographyCSSClasses}>
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3 onClick={onClick} className={typographyCSSClasses}>
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4 onClick={onClick} className={typographyCSSClasses}>
          {text}
        </h4>
      );
    case "h5":
      return (
        <h5 onClick={onClick} className={typographyCSSClasses}>
          {text}
        </h5>
      );
    case "h6":
      return (
        <h6 onClick={onClick} className={typographyCSSClasses}>
          {text}
        </h6>
      );

    default:
      break;
  }
};
