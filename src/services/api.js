import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://app.tablecrm.com/api/v1';

// Axios instance yaratish
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token bilan so'rovlar uchun
export const createApiClient = (token) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      token: token,
    },
  });
};

// Mijozlarni qidirish (telefon bo'yicha)
export const searchContragents = async (token, phone) => {
  const client = createApiClient(token);
  try {
    const response = await client.get('/contragents', {
      params: {
        token: token,
        phone: phone, // API phone parametrini kutadi
      },
    });
    console.log('✅ Mijozlar qidiruv javobi:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Mijozlarni qidirishda xatolik:', error);
    // Agar phone bilan ishlamasa, search bilan urinib ko'ramiz
    try {
      const response = await client.get('/contragents', {
        params: {
          token: token,
          search: phone,
        },
      });
      return response.data;
    } catch (err) {
      throw error;
    }
  }
};

// Omborlarni olish
export const getWarehouses = async (token) => {
  const client = createApiClient(token);
  try {
    // To'g'ri endpoint: /warehouses/warehouses/
    const response = await client.get('/warehouses/warehouses/', {
      params: {
        token: token,
      },
    });
    
    console.log('✅ Omborlar API javobi:', response.data);
    return response.data;
  } catch (error) {
    // Agar to'g'ri endpoint ishlamasa, oddiy endpoint bilan urinib ko'ramiz
    try {
      const response = await client.get('/warehouses', {
        params: {
          token: token,
        },
      });
      console.log('✅ Omborlar API javobi (fallback):', response.data);
      return response.data;
    } catch (err) {
      console.error('❌ Omborlarni olishda xatolik:', err);
      if (err.response) {
        console.error('API xatolik javobi:', err.response.data);
        console.error('Status code:', err.response.status);
      }
      throw err;
    }
  }
};

// Hisoblarni olish
export const getPayboxes = async (token) => {
  const client = createApiClient(token);
  try {
    // To'g'ri endpoint: /payboxes/meta/payboxes/
    const response = await client.get('/payboxes/meta/payboxes/', {
      params: {
        token: token,
      },
    });
    
    console.log('✅ Hisoblar API javobi:', response.data);
    return response.data;
  } catch (error) {
    // Agar to'g'ri endpoint ishlamasa, oddiy endpoint bilan urinib ko'ramiz
    try {
      const response = await client.get('/payboxes', {
        params: {
          token: token,
        },
      });
      console.log('✅ Hisoblar API javobi (fallback):', response.data);
      return response.data;
    } catch (err) {
      console.error('❌ Hisoblarni olishda xatolik:', err);
      if (err.response) {
        console.error('API xatolik javobi:', err.response.data);
        console.error('Status code:', err.response.status);
      }
      throw err;
    }
  }
};

// Tashkilotlarni olish
export const getOrganizations = async (token) => {
  const client = createApiClient(token);
  try {
    // To'g'ri endpoint: /organizations/organizations/
    const response = await client.get('/organizations/organizations/', {
      params: {
        token: token,
      },
    });
    
    console.log('✅ Tashkilotlar API javobi:', response.data);
    return response.data;
  } catch (error) {
    // Agar to'g'ri endpoint ishlamasa, oddiy endpoint bilan urinib ko'ramiz
    try {
      const response = await client.get('/organizations', {
        params: {
          token: token,
        },
      });
      console.log('✅ Tashkilotlar API javobi (fallback):', response.data);
      return response.data;
    } catch (err) {
      console.error('❌ Tashkilotlarni olishda xatolik:', err);
      if (err.response) {
        console.error('API xatolik javobi:', err.response.data);
        console.error('Status code:', err.response.status);
      }
      throw err;
    }
  }
};

// Narx turlarini olish
export const getPriceTypes = async (token) => {
  const client = createApiClient(token);
  try {
    // To'g'ri endpoint: /price_types/price_types/
    const response = await client.get('/price_types/price_types/', {
      params: {
        token: token,
      },
    });
    
    console.log('✅ Narx turlari API javobi:', response.data);
    return response.data;
  } catch (error) {
    // Agar to'g'ri endpoint ishlamasa, oddiy endpoint bilan urinib ko'ramiz
    try {
      const response = await client.get('/price_types', {
        params: {
          token: token,
        },
      });
      console.log('✅ Narx turlari API javobi (fallback):', response.data);
      return response.data;
    } catch (err) {
      console.error('❌ Narx turlarini olishda xatolik:', err);
      if (err.response) {
        console.error('API xatolik javobi:', err.response.data);
        console.error('Status code:', err.response.status);
      }
      throw err;
    }
  }
};

// Mahsulotlarni qidirish
export const searchNomenclature = async (token, searchTerm) => {
  const client = createApiClient(token);
  try {
    // To'g'ri endpoint: /nomenclature/nomenclature/
    const response = await client.get('/nomenclature/nomenclature/', {
      params: {
        token: token,
        search: searchTerm,
      },
    });
    console.log('✅ Mahsulotlar qidiruv javobi:', response.data);
    return response.data;
  } catch (error) {
    // Agar to'g'ri endpoint ishlamasa, oddiy endpoint bilan urinib ko'ramiz
    try {
      const response = await client.get('/nomenclature', {
        params: {
          token: token,
          search: searchTerm,
        },
      });
      return response.data;
    } catch (err) {
      console.error('❌ Mahsulotlarni qidirishda xatolik:', err);
      throw err;
    }
  }
};

// Savdo yaratish
export const createSale = async (token, saleData) => {
  const client = createApiClient(token);
  try {
    // API array formatida ma'lumot kutadi
    const requestData = Array.isArray(saleData) ? saleData : [saleData];
    
    const response = await client.post('/docs_sales', requestData, {
      params: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Savdo yaratishda xatolik:', error);
    if (error.response) {
      console.error('API xatolik javobi:', error.response.data);
    }
    throw error;
  }
};

