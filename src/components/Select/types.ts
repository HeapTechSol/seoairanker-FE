export type OptionsType = {
  label: string;
  id: string;
};

export type SelectProps = {
  Options: OptionsType[];
  placeholder: string;
  values: OptionsType[] | OptionsType;
  multiple?: boolean;
  searchable?: boolean;
  selectAllOption?: boolean;
  loading?: boolean;
  onScroll?:(value:boolean)=>void;
  setValues: React.Dispatch<React.SetStateAction<OptionsType | OptionsType[]>>;
};
