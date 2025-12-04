import { useState, useEffect } from 'react';
import TokenForm from './components/TokenForm';
import PhoneSearch from './components/PhoneSearch';
import Dropdown from './components/Dropdown';
import ProductSearch from './components/ProductSearch';
import {
  getWarehouses,
  getPayboxes,
  getOrganizations,
  getPriceTypes,
} from './services/api';
import { createSale } from './services/api';

function App() {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Dropdown ma'lumotlari
  const [warehouses, setWarehouses] = useState([]);
  const [payboxes, setPayboxes] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [priceTypes, setPriceTypes] = useState([]);
  
  // Tanlangan qiymatlar
  const [selectedContragent, setSelectedContragent] = useState(null);
  const [selectedPaybox, setSelectedPaybox] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedPriceType, setSelectedPriceType] = useState(null);
  const [products, setProducts] = useState([]);
  
  // Loading holatlari
  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [isLoadingPayboxes, setIsLoadingPayboxes] = useState(false);
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false);
  const [isLoadingPriceTypes, setIsLoadingPriceTypes] = useState(false);
  const [isCreatingSale, setIsCreatingSale] = useState(false);

  // Token kiritilganda
  const handleTokenSubmit = (submittedToken) => {
    setToken(submittedToken);
    setIsAuthenticated(true);
    loadAllData(submittedToken);
  };

  // Barcha ma'lumotlarni yuklash
  const loadAllData = async (authToken) => {
    setIsLoadingWarehouses(true);
    setIsLoadingPayboxes(true);
    setIsLoadingOrganizations(true);
    setIsLoadingPriceTypes(true);

    try {
      // Har bir API so'rovini alohida boshqarish
      let warehousesData, payboxesData, organizationsData, priceTypesData;

      try {
        warehousesData = await getWarehouses(authToken);
        console.log('✅ Omborlar yuklandi:', warehousesData);
      } catch (err) {
        console.error('❌ Omborlarni olishda xatolik:', err);
        warehousesData = null;
      }

      try {
        payboxesData = await getPayboxes(authToken);
        console.log('✅ Hisoblar yuklandi:', payboxesData);
      } catch (err) {
        console.error('❌ Hisoblarni olishda xatolik:', err);
        payboxesData = null;
      }

      try {
        organizationsData = await getOrganizations(authToken);
        console.log('✅ Tashkilotlar yuklandi:', organizationsData);
      } catch (err) {
        console.error('❌ Tashkilotlarni olishda xatolik:', err);
        organizationsData = null;
      }

      try {
        priceTypesData = await getPriceTypes(authToken);
        console.log('✅ Narx turlari yuklandi:', priceTypesData);
      } catch (err) {
        console.error('❌ Narx turlarini olishda xatolik:', err);
        priceTypesData = null;
      }

      // Ma'lumotlarni parse qilish
      const parseData = (data) => {
        console.log('Parse qilinayotgan ma\'lumot:', data);
        
        if (!data) {
          console.warn('Ma\'lumot bo\'sh');
          return [];
        }
        
        if (Array.isArray(data)) {
          console.log('Array formatida:', data.length, 'ta element');
          return data;
        }
        
        if (data.results && Array.isArray(data.results)) {
          console.log('results formatida:', data.results.length, 'ta element');
          return data.results;
        }
        
        if (data.data && Array.isArray(data.data)) {
          console.log('data formatida:', data.data.length, 'ta element');
          return data.data;
        }
        
        if (typeof data === 'object') {
          // Agar object bo'lsa, uni arrayga aylantirish
          const values = Object.values(data).filter(item => item && typeof item === 'object');
          console.log('Object formatida:', values.length, 'ta element');
          return values;
        }
        
        console.warn('Noma\'lum format:', typeof data);
        return [];
      };

      const warehouses = parseData(warehousesData);
      const payboxes = parseData(payboxesData);
      const organizations = parseData(organizationsData);
      const priceTypes = parseData(priceTypesData);

      console.log('📊 Yakuniy yuklangan ma\'lumotlar:', {
        warehouses: warehouses.length,
        payboxes: payboxes.length,
        organizations: organizations.length,
        priceTypes: priceTypes.length,
      });

      // Ma'lumotlarni ko'rsatish va tekshirish
      if (warehouses.length > 0) {
        console.log('📦 Omborlar namuna:', warehouses[0]);
        console.log('📦 Omborlar struktura:', Object.keys(warehouses[0]));
      }
      if (payboxes.length > 0) {
        console.log('💰 Hisoblar namuna:', payboxes[0]);
        console.log('💰 Hisoblar struktura:', Object.keys(payboxes[0]));
      }
      if (organizations.length > 0) {
        console.log('🏢 Tashkilotlar namuna:', organizations[0]);
        console.log('🏢 Tashkilotlar struktura:', Object.keys(organizations[0]));
        console.log('🏢 Tashkilotlar work_name:', organizations[0].work_name);
        console.log('🏢 Tashkilotlar full_name:', organizations[0].full_name);
      }
      if (priceTypes.length > 0) {
        console.log('💵 Narx turlari namuna:', priceTypes[0]);
        console.log('💵 Narx turlari struktura:', Object.keys(priceTypes[0]));
      }

      setWarehouses(warehouses);
      setPayboxes(payboxes);
      setOrganizations(organizations);
      setPriceTypes(priceTypes);

      // Agar barcha ma'lumotlar bo'sh bo'lsa, xabar ko'rsatish
      if (warehouses.length === 0 && payboxes.length === 0 && organizations.length === 0 && priceTypes.length === 0) {
        alert('Ma\'lumotlar yuklanmadi. Iltimos, tokenni tekshiring va qayta urinib ko\'ring.');
      }
    } catch (error) {
      console.error('❌ Ma\'lumotlarni yuklashda umumiy xatolik:', error);
      alert('Ma\'lumotlarni yuklashda xatolik yuz berdi. Iltimos, tokenni tekshiring.');
    } finally {
      setIsLoadingWarehouses(false);
      setIsLoadingPayboxes(false);
      setIsLoadingOrganizations(false);
      setIsLoadingPriceTypes(false);
    }
  };

  // Mahsulot tanlash
  const handleProductSelect = (product) => {
    setProducts([...products, product]);
  };

  // Mahsulotni o'chirish
  const handleProductRemove = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Mahsulot miqdorini o'zgartirish
  const handleQuantityChange = (index, newQuantity) => {
    const updated = products.map((product, i) => 
      i === index ? { ...product, quantity: Math.max(1, parseInt(newQuantity) || 1) } : product
    );
    setProducts(updated);
  };

  // Chegirmani o'zgartirish
  const handleDiscountChange = (index, discount) => {
    const updated = products.map((product, i) => 
      i === index ? { ...product, discount: Math.max(0, discount) } : product
    );
    setProducts(updated);
  };

  // Savdo yaratish
  const handleCreateSale = async (post = false) => {
    if (!token) {
      alert('Token kiritilmagan!');
      return;
    }

    if (!selectedContragent) {
      alert('Mijoz tanlang!');
      return;
    }

    if (!selectedWarehouse) {
      alert('Ombor tanlang!');
      return;
    }

    if (!selectedPaybox) {
      alert('Hisob tanlang!');
      return;
    }

    if (!selectedOrganization) {
      alert('Tashkilot tanlang!');
      return;
    }

    if (products.length === 0) {
      alert('Kamida bitta mahsulot tanlang!');
      return;
    }

    setIsCreatingSale(true);

    try {
      // Jami summani hisoblash (chegirma bilan)
      const totalAmount = products.reduce((sum, p) => {
        const basePrice = (p.price || 0) * (p.quantity || 1);
        const discount = (p.discount || 0) * (p.quantity || 1);
        return sum + (basePrice - discount);
      }, 0);
      
      // TableCRM API formatiga moslashtirish
      const saleData = {
        priority: 0,
        dated: Math.floor(Date.now() / 1000), // Unix timestamp
        operation: "Заказ",
        tax_included: true,
        tax_active: true,
        goods: products.map(product => ({
          price: product.price || 0,
          quantity: product.quantity || 1,
          unit: product.unit || 116, // Default unit (o'lchov birligi)
          discount: product.discount || 0,
          sum_discounted: (product.discount || 0) * (product.quantity || 1),
          nomenclature: product.id || product.value || product.nomenclature_id,
        })),
        settings: {},
        warehouse: selectedWarehouse.id || selectedWarehouse.value,
        contragent: selectedContragent.id || selectedContragent.value,
        paybox: selectedPaybox.id || selectedPaybox.value,
        organization: selectedOrganization.id || selectedOrganization.value,
        status: post, // true = "yaratish va to'ldirish", false = "yaratish"
        paid_rubles: totalAmount.toFixed(2),
        paid_lt: 0,
      };

      // Loyalty card ID qo'shish (agar mavjud bo'lsa)
      if (selectedContragent.loyality_card_id) {
        saleData.loyality_card_id = selectedContragent.loyality_card_id;
      }

      const result = await createSale(token, saleData);
      alert(post ? 'Savdo muvaffaqiyatli yaratildi va to\'ldirildi!' : 'Savdo muvaffaqiyatli yaratildi!');
      console.log('Savdo natijasi:', result);
      
      // Formani tozalash
      setSelectedContragent(null);
      setSelectedPaybox(null);
      setSelectedWarehouse(null);
      setSelectedOrganization(null);
      setSelectedPriceType(null);
      setProducts([]);
    } catch (error) {
      console.error('Savdo yaratishda xatolik:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Savdo yaratishda xatolik yuz berdi';
      alert(`Xatolik: ${errorMessage}. Iltimos, qayta urinib ko'ring.`);
    } finally {
      setIsCreatingSale(false);
    }
  };

  // Jami hisoblar (chegirma bilan)
  const totalItems = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const totalAmount = products.reduce((sum, p) => {
    const basePrice = (p.price || 0) * (p.quantity || 1);
    const discount = (p.discount || 0) * (p.quantity || 1);
    return sum + (basePrice - discount);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Mobil Buyurtma Shakli
          {/* <h2>token</h2> */}
          <p className="text-sm text-gray-500">af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77
          </p>
        </h1>

        {!isAuthenticated ? (
          <TokenForm onTokenSubmit={handleTokenSubmit} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Mijoz qidiruv */}
            <PhoneSearch
              token={token}
              selectedContragent={selectedContragent}
              onContragentSelect={setSelectedContragent}
            />

            {/* Hisob tanlash */}
            <Dropdown
              label="Счёт поступления"
              options={payboxes}
              value={selectedPaybox?.id || selectedPaybox?.value}
              onChange={setSelectedPaybox}
              isLoading={isLoadingPayboxes}
            />

            {/* Ombor tanlash */}
            <Dropdown
              label="Склад отгрузки"
              options={warehouses}
              value={selectedWarehouse?.id || selectedWarehouse?.value}
              onChange={setSelectedWarehouse}
              isLoading={isLoadingWarehouses}
            />

            {/* Tashkilot tanlash */}
            <Dropdown
              label="Организация"
              options={organizations}
              value={selectedOrganization?.id || selectedOrganization?.value}
              onChange={setSelectedOrganization}
              isLoading={isLoadingOrganizations}
            />

            {/* Narx turi tanlash */}
            <Dropdown
              label="Тип цены"
              options={priceTypes}
              value={selectedPriceType?.id || selectedPriceType?.value}
              onChange={setSelectedPriceType}
              isLoading={isLoadingPriceTypes}
            />

            {/* Mahsulot qidiruv */}
            <ProductSearch
              token={token}
              selectedProducts={products}
              onProductSelect={handleProductSelect}
              onProductRemove={handleProductRemove}
              onQuantityChange={handleQuantityChange}
              onDiscountChange={handleDiscountChange}
            />

            {/* Jami ma'lumotlar */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-gray-700">Итого товаров: </span>
                <span className="text-sm font-bold">{totalItems}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Сумма: </span>
                <span className="text-sm font-bold">{totalAmount.toFixed(2)} ₽</span>
              </div>
            </div>

            {/* Tugmalar */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => handleCreateSale(false)}
                disabled={isCreatingSale}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreatingSale ? 'Yaratilmoqda...' : 'Создать продажу'}
              </button>
              <button
                onClick={() => handleCreateSale(true)}
                disabled={isCreatingSale}
                className="flex-1 px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreatingSale ? 'Yaratilmoqda...' : 'Создать и провести'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

