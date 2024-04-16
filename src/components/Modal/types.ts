export type ModalProps = {
  title?: string;
  cancelText?: string;
  OkText?: string;
  children?: JSX.Element | JSX.Element[] | string;
  contentLoading: boolean;
  requestLoading: boolean;
  footer?: boolean;
  setShowModel: (value: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
  show: boolean;
  className?: string;
  footerLocation?:
    | "space-between"
    | "left"
    | "right"
    | "right-no-bar"
    | "left-no-bar";
  header?: boolean;
};
