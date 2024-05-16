import { useRef } from "react";

import Button from "@/components/Button";
import Loader from "@/components/Loader";

import { ModalProps } from "./types";

import "./Modal.scss";

const Modal = ({
  title,
  cancelText = "",
  OkText = "",
  footer = true,
  header = true,
  contentLoading=false,
  requestLoading=false,
  setShowModel,
  onSubmit,
  onCancel = () => setShowModel(false),
  show,
  children,
  className,
  footerLocation = "right",
  OkButtonProperties,
}: ModalProps) => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const outSideClick = (e: any) => {
    e.stopPropagation();
    if (e.target.classList[0] === "modal-container") {
      if (
        bubbleRef.current &&
        [...bubbleRef.current.classList].includes("bubble")
      )
        bubbleRef.current.classList.remove("bubble");
      setTimeout(() => bubbleRef.current?.classList.add("bubble"), 0);
    }
  };

  const modalTitle = title && title;

  const cancelButton = cancelText && (
    <Button
      variant="outlined"
      onClick={() => onCancel()}
      size="sm"
      type="borderRadius"
    >
      {cancelText}
    </Button>
  );

  const submitButton = OkText && (
    <Button
      variant="filled"
      loading={requestLoading}
      onClick={() => onSubmit()}
      type="borderRadius"
      size="sm"
      {...OkButtonProperties}
    >
      {OkText}
    </Button>
  );

  const footerContent = footer && (
    <div className={`modal-footer ${footerLocation || ""}`}>
      {cancelButton} {submitButton}
    </div>
  );

  const headerContent = header && (
    <div className="modal-header">
      <div className="modal-header_title">{modalTitle}</div>
      <div
        className="modal-header_icon"
        onClick={() => setShowModel(false)}
      ></div>
    </div>
  );

  return (
    <div
      className={`modal-container ${show ? "show" : "hide"} ${className || ""}`}
      onClick={(e) => outSideClick(e)}
      ref={bubbleRef}
    >
      <div className={`modal`}>
        {headerContent}
        <div className="modal-body">
          <Loader loading={contentLoading} overlay={true} />
          {children}
        </div>
        {footerContent}
      </div>
    </div>
  );
};

export default Modal;
