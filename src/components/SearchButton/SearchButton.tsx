import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchButton = ({
  placeholder = "Tìm kiếm...",
  onSearch = (value: string) => console.log(value),
  className = "",
  debounceTime = 300,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.trim()) {
        onSearch(searchValue);
      }
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch, debounceTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setSearchValue("");
    onSearch("");
  };

  const MobileSearch = () => (
    <form onSubmit={handleSubmit} className="flex items-center w-full">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          className="w-full pr-8 rounded-full text-gray-500 border-gray-300 focus-visible:ring-offset-0"
        />
        {searchValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 hover:bg-transparent"
            onClick={handleClose}
          >
            <X className="h-4 w-4 text-gray-500 hover:text-gray-600" />
          </Button>
        )}
      </div>
      <Button
        type="submit"
        size="icon"
        className="ml-2 rounded-full hover:scale-110 bg-indigo-400 transition-transform duration-200"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );

  const DesktopSearch = () => (
    <>
      {!isOpen ? (
        <Button
          variant="outline"
          size="icon"
          className="font-semibold rounded-full hover:scale-110 hover:bg-indigo-400 hover:text-white transition-transform duration-200"
          onClick={() => setIsOpen(true)}
        >
          <Search className="h-4 w-4" />
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative animate-in slide-in-from-right-5 duration-200">
            <Input
              type="text"
              placeholder={placeholder}
              value={searchValue}
              onChange={handleChange}
              className="w-[200px] pr-8 rounded-full text-gray-500 border-gray-300 focus-visible:ring-offset-0"
              autoFocus
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 hover:bg-transparent"
              onClick={() => {
                setIsOpen(false);
                handleClose();
              }}
            >
              <X className="h-4 w-4 text-gray-500 hover:text-gray-600" />
            </Button>
          </div>
          <Button
            type="submit"
            size="icon"
            className="ml-2 rounded-full hover:scale-110 bg-indigo-400 hover:bg-indigo-500 transition-transform duration-200"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
      )}
    </>
  );

  return (
    <div className={`relative ${className}`}>
      <div className="block md:hidden">
        <MobileSearch />
      </div>
      <div className="hidden md:block">
        <DesktopSearch />
      </div>
    </div>
  );
};

export default SearchButton;
