import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { ChevronDown, Languages } from "lucide-react";

const LanguageSwitcher = ({ className = "" }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeLanguage = (lng) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative  h-fit grid justify-center ${className}`} 
    >
      <Button
        className="flex items-center gap-1 w-fit h-10"
        onClick={() => setIsOpen(!isOpen)}
        size="md"
        variant="primary"
      >
        <Languages size={16} />
        <span className="capitalize">
          {i18n.language === "fr"
            ? t("locales.fr.placeholder")
            : t("locales.en.placeholder")}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </Button>

      <div
        className={`absolute shadow-lg w-40 transform transition-all duration-200 z-99
        ${
          isOpen
            ? "opacity-100 scale-100 mt-11! translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col p-2">
          <li
            className={`flex items-center gap-2 p-2 ${
              i18n.language === "en"
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => changeLanguage("en")}
          >
            <Languages size={16} /> {t("locales.en.label")}
          </li>

          <li
            className={`flex items-center gap-2 p-2 rounded-md  ${
              i18n.language === "fr"
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => changeLanguage("fr")}
          >
            <Languages size={16} /> {t("locales.fr.label")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;