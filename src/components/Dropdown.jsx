import { useState, useRef, useEffect } from 'react';

const Dropdown = ({ label, options, value, onChange, placeholder = 'Выберите...', isLoading = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options?.find(opt => 
    (opt.id && opt.id === value) || (opt.value && opt.value === value)
  );

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
          disabled={isLoading}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {isLoading ? 'Yuklanmoqda...' : (
              selectedOption?.work_name ||
              selectedOption?.full_name ||
              selectedOption?.short_name ||
              selectedOption?.name || 
              selectedOption?.title || 
              selectedOption?.title_uz || 
              selectedOption?.title_ru ||
              selectedOption?.label ||
              placeholder
            )}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options && options.length > 0 ? (
              options.map((option, index) => {
                // Turli xil formatlardagi ma'lumotlarni ko'rsatish
                // Organizations uchun: work_name, full_name, short_name
                // Boshqa uchun: name, title, label
                const displayName = option.work_name ||
                                  option.full_name ||
                                  option.short_name ||
                                  option.name || 
                                  option.title || 
                                  option.title_uz || 
                                  option.title_ru ||
                                  option.label ||
                                  (typeof option === 'string' ? option : JSON.stringify(option));
                
                return (
                  <button
                    key={option.id || option.value || option.code || index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {displayName}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                {isLoading ? 'Yuklanmoqda...' : 'Ma\'lumot topilmadi'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

