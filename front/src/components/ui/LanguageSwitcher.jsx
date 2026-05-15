import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
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

  // Obtenir le libellé de la langue actuelle
  const getCurrentLanguageLabel = () => {
    const currentLang = i18n.language;
    if (currentLang === 'fr') {
      return 'FR';
    } else if (currentLang === 'en') {
      return 'EN';
    }
    return 'FR';
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative h-fit grid justify-center ${className}`}
    >
      <button
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)'
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages size={16} />
        <span className="capitalize font-semibold">
          {getCurrentLanguageLabel()}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute top-full left-0 mt-2 shadow-lg w-40 transform transition-all duration-200 z-50
        ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul 
          className="flex flex-col p-1 rounded-lg overflow-hidden"
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <li
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-150 ${
              i18n.language === "en"
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer hover:bg-primary/10"
            }`}
            style={{
              color: i18n.language === "en" ? 'var(--muted-foreground)' : 'var(--foreground)'
            }}
            onClick={() => changeLanguage("en")}
          >
            <Languages size={14} style={{ color: 'var(--primary)' }} />
            <span className="text-sm">English</span>
            {i18n.language === "en" && (
              <span className="ml-auto text-xs" style={{ color: 'var(--primary)' }}>✓</span>
            )}
          </li>

          <li
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-150 ${
              i18n.language === "fr"
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer hover:bg-primary/10"
            }`}
            style={{
              color: i18n.language === "fr" ? 'var(--muted-foreground)' : 'var(--foreground)'
            }}
            onClick={() => changeLanguage("fr")}
          >
            <Languages size={14} style={{ color: 'var(--primary)' }} />
            <span className="text-sm">Français</span>
            {i18n.language === "fr" && (
              <span className="ml-auto text-xs" style={{ color: 'var(--primary)' }}>✓</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;