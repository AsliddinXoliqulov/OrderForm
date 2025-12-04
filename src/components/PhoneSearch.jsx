import { useState, useEffect, useRef } from 'react';
import { searchContragents } from '../services/api';

const PhoneSearch = ({ token, selectedContragent, onContragentSelect }) => {
  const [phone, setPhone] = useState('');
  const [contragents, setContragents] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      // Input focus bo'lganda yoki birinchi belgi kiritilganda darhol qidiruvni boshlash
      if (phone.trim().length >= 1 && token) {
        handleSearch();
      } else if (phone.trim().length === 0) {
        // Bo'sh input bo'lsa, ro'yxatni tozalash
        setContragents([]);
      }
    }, 300); // Debounce vaqtini 300ms ga kamaytirdik - tezroq javob

    return () => clearTimeout(searchTimer);
  }, [phone, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setContragents([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (!token || !phone.trim()) return;
    
    setIsSearching(true);
    try {
      const data = await searchContragents(token, phone);

      console.log('📞 searchContragents javobi:', data);

      // Turli formatlarni qo'llab-quvvatlash uchun parse
      let parsed = [];

      if (Array.isArray(data)) {
        parsed = data;
      } else if (data?.results && Array.isArray(data.results)) {
        parsed = data.results;
      } else if (data?.data && Array.isArray(data.data)) {
        parsed = data.data;
      } else if (data && typeof data === 'object') {
        const arrayValues = Object.values(data).find(
          (v) => Array.isArray(v) && v.length > 0
        );
        if (arrayValues) {
          parsed = arrayValues;
        }
      }

      console.log('📞 Parsed contragents:', parsed);
      setContragents(parsed);
    } catch (error) {
      console.error('Qidiruv xatosi:', error);
      setContragents([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelect = (contragent) => {
    console.log('✅ Tanlangan mijoz:', contragent);
    setContragents([]);
    setPhone('');
    onContragentSelect(contragent);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Контрагент (поиск по телефону)
      </label>
      <div className="relative" ref={searchRef}>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onFocus={() => {
            // Input focus bo'lganda, agar telefon raqami bo'lsa, darhol qidiruvni boshlash
            if (phone.trim().length >= 1 && token) {
              handleSearch();
            }
          }}
          placeholder="Номер телефона + 1 символ, затем поиск
"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isSearching && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}
        {contragents.length > 0 && !selectedContragent && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {contragents.map((contragent, index) => (
              <button
                key={contragent.id || contragent.value || index}
                type="button"
                onClick={() => handleSelect(contragent)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                <div className="font-medium">
                  {contragent.name ||
                    contragent.title ||
                    contragent.work_name ||
                    contragent.full_name ||
                    contragent.short_name ||
                    'Mijoz'}
                </div>
                {contragent.phone && (
                  <div className="text-sm text-gray-500">{contragent.phone}</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedContragent && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            Tanlangan:{' '}
            {selectedContragent.name ||
              selectedContragent.title ||
              selectedContragent.work_name ||
              selectedContragent.full_name ||
              selectedContragent.short_name ||
              'Mijoz'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneSearch;
 
