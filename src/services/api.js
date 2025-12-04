import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://app.tablecrm.com/api/v1';

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

export const searchContragents = async (token, phone, options = {}) => {
  const client = createApiClient(token);
  const { search, limit, offset } = options;
  
  try {
    const params = {};
    if (phone) params.phone = phone;
    if (search) params.search = search;
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    
    const response = await client.get('/meta/contragents/', {
      params: {
        token: token,
        ...params,
      },
    });
    console.log('✅ Mijozlar qidiruv javobi (meta/contragents):', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Mijozlarni qidirishda xatolik (meta/contragents):', error);
    // Fallback: eski endpoint
    try {
      const params = {};
      if (phone) params.phone = phone;
      if (search) params.search = search;
      if (limit) params.limit = limit;
      if (offset) params.offset = offset;
      
      const response = await client.get('/contragents', {
        params: {
          token: token,
          ...params,
        },
      });
      console.log('✅ Mijozlar qidiruv javobi (fallback /contragents):', response.data);
      return response.data;
    } catch (err) {
      console.error('❌ Mijozlarni qidirishda yakuniy xatolik:', err);
      throw err;
    }
  }
};

// Omborlarni olish
// Swagger: GET /warehouses/warehouses/
// Qo'llab-quvvatlanadigan parametrlar: limit, offset, search
export const getWarehouses = async (token, options = {}) => {
  const client = createApiClient(token);
  const { limit, offset, search } = options;
  
  try {
    const params = {};
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    if (search) params.search = search;
    
    const response = await client.get('/warehouses/warehouses/', {
      params: {
        token: token,
        ...params,
      },
    });
    console.log('✅ Omborlar API javobi:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Omborlarni olishda xatolik:', error);
    try {
      const params = {};
      if (limit) params.limit = limit;
      if (offset) params.offset = offset;
      if (search) params.search = search;
      
      const response = await client.get('/warehouses', {
        params: {
          token: token,
          ...params,
        },
      });
      console.log('✅ Omborlar API javobi (fallback):', response.data);
      return response.data;
    } catch (err) {
      console.error('❌ Omborlarni olishda yakuniy xatolik:', err);
      throw err;
    }
  }
};

// Hisoblarni olish
// Swagger: GET /payboxes/meta/payboxes/
// Qo'llab-quvvatlanadigan parametrlar: limit, offset, search
export const getPayboxes = async (token, options = {}) => {
  const client = createApiClient(token);
  const { limit, offset, search } = options;
  
  try {
    const params = {};
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    if (search) params.search = search;
    
    const response = await client.get('/payboxes/meta/payboxes/', {
      params: {
        token: token,
        ...params,
      },
    });
    console.log('✅ Hisoblar API javobi:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Hisoblarni olishda xatolik:', error);
    try {
      const params = {};
      if (limit) params.limit = limit;
      if (offset) params.offset = offset;
      if (search) params.search = search;
      
      const response = await client.get('/payboxes', {
        params: {
          token: token,
          ...params,
        },
      });
      console.log('✅ Hisoblar API javobi (fallback):', response.data);
      return response.data;
    } catch (err) {
      console.error('❌ Hisoblarni olishda yakuniy xatolik:', err);
      throw err;
    }
  }
};

// Tashkilotlarni olish
// Swagger: GET /organizations/organizations/
// Qo'llab-quvvatlanadigan parametrlar: limit, offset, search
export const getOrganizations = async (token, options = {}) => {
  const client = createApiClient(token);
  const { limit, offset, search } = options;
  
  try {
    const params = {};
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    if (search) params.search = search;
    
    const response = await client.get('/organizations/organizations/', {
      params: {
        token: token,
        ...params,
      },
    });
    console.log('✅ Tashkilotlar API javobi:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Tashkilotlarni olishda xatolik:', error);
    try {
      const params = {};
      if (limit) params.limit = limit;
      if (offset) params.offset = offset;
      if (search) params.search = search;
      
      const response = await client.get('/organizations', {
        params: {
          token: token,
          ...params,
        },
      });
      console.log('✅ Tashkilotlar API javobi (fallback):', response.data);
      return response.data;
    } catch (err) {
      console.error('❌ Tashkilotlarni olishda yakuniy xatolik:', err);
      throw err;
    }
  }
};

// Narx turlarini olish
// Swagger: GET /price_types/price_types/
// Qo'llab-quvvatlanadigan parametrlar: limit, offset, search
export const getPriceTypes = async (token, options = {}) => {
  const client = createApiClient(token);
  const { limit, offset, search } = options;
  
  try {
    const params = {};
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    if (search) params.search = search;
    
    const response = await client.get('/price_types/price_types/', {
      params: {
        token: token,
        ...params,
      },
    });
    console.log('✅ Narx turlari API javobi:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Narx turlarini olishda xatolik:', error);
    if (error.response) {
      console.error('API xatolik javobi:', error.response.data);
      console.error('Status code:', error.response.status);
    }
    // Fallback: oddiy endpoint
    try {
      const params = {};
      if (limit) params.limit = limit;
      if (offset) params.offset = offset;
      if (search) params.search = search;
      
      const response = await client.get('/price_types', {
        params: {
          token: token,
          ...params,
        },
      });
      console.log('✅ Narx turlari API javobi (fallback):', response.data);
      return response.data;
    } catch (err) {
      console.error('❌ Narx turlarini olishda yakuniy xatolik:', err);
      throw err;
    }
  }
};

export const searchNomenclature = async (token, searchTerm, options = {}) => {
  const client = createApiClient(token);
  const { limit, offset, warehouse, price_type } = options;
  
  try {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    if (warehouse) params.warehouse = warehouse;
    if (price_type) params.price_type = price_type;
    
    const response = await client.get('/nomenclature/nomenclature/', {
      params: {
        token: token,
        ...params,
      },
    });
    console.log('✅ Mahsulotlar qidiruv javobi:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Mahsulotlarni qidirishda xatolik:', error);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (limit) params.limit = limit;
      if (offset) params.offset = offset;
      if (warehouse) params.warehouse = warehouse;
      if (price_type) params.price_type = price_type;
      
      const response = await client.get('/nomenclature', {
        params: {
          token: token,
          ...params,
        },
      });
      return response.data;
    } catch (err) {
      console.error('❌ Mahsulotlarni qidirishda yakuniy xatolik:', err);
      throw err;
    }
  }
};

// Savdo yaratish
export const createSale = async (token, saleData) => {
  const client = createApiClient(token);
  try {
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
      console.error('Status code:', error.response.status);
    }
    throw error;
  }
};
