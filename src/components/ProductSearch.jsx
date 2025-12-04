import { useState, useEffect, useRef } from 'react';
import { searchNomenclature } from '../services/api';

const ProductSearch = ({ token, selectedProducts = [], onProductSelect, onProductRemove, onQuantityChange, onDiscountChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (searchTerm.trim().length >= 2 && token) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchTerm, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (!token || !searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      const data = await searchNomenclature(token, searchTerm);
      setSearchResults(Array.isArray(data) ? data : (data.results || data.data || []));
    } catch (error) {
      console.error('Mahsulot qidiruv xatosi:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelect = (product) => {
    const newProduct = {
      ...product,
      quantity: 1,
      price: product.price || 0,
      discount: 0, // Default discount
    };
    setSearchTerm('');
    setSearchResults([]);
    onProductSelect(newProduct);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Поиск товара
      </label>
      <div className="relative mb-4" ref={searchRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введите название"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isSearching && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {searchResults.map((product, index) => (
              <button
                key={product.id || index}
                type="button"
                onClick={() => handleSelect(product)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium">{product.name || product.title}</div>
                {product.price && (
                  <div className="text-sm text-gray-500">{product.price} ₽</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedProducts.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tanlangan mahsulotlar:</h3>
          {selectedProducts.map((product, index) => {
            const basePrice = (product.price || 0) * (product.quantity || 1);
            const discountAmount = (product.discount || 0) * (product.quantity || 1);
            const finalPrice = basePrice - discountAmount;
            
            return (
              <div key={index} className="p-3 bg-gray-50 rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{product.name || product.title}</div>
                    <div className="text-sm text-gray-500">
                      {product.price || 0} ₽ × {product.quantity || 1}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onProductRemove(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-gray-600">Miqdor:</label>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity || 1}
                      onChange={(e) => onQuantityChange(index, e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-600">Chegirma (₽):</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={product.discount || 0}
                      onChange={(e) => onDiscountChange(index, parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Jami: <span className="font-semibold">{finalPrice.toFixed(2)} ₽</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="text-xs text-green-600">
                      Chegirma: -{discountAmount.toFixed(2)} ₽
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;

