export interface IDesktopSearchProps {
    searchValue: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleClose: () => void;
    placeholder: string;
  }
  
  export interface IMobileSearchProps {
    searchValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleClose: () => void;
    placeholder: string;
  }
  