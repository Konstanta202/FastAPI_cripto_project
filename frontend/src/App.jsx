import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import CryptocurrencyCard from "./components/CryptocurrencyCard.jsx"
import { Menu } from 'antd';
import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',  // Берем из переменной окружения или используем /api
  timeout: 10000,  // Таймаут 10 секунд
});

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrencies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Используем относительный путь! Nginx сам перенаправит на бэкенд
      const resp = await api.get('/cryptocurrencies/');
      
      const currenciesResponse = resp.data;
      const menuItems = [
        {
          label: "Список криптовалют",
          children: currenciesResponse.map(c => ({
            label: c.name, 
            key: c.id
          })),
          type: 'group'
        }
      ];
      setCurrencies(menuItems);
    } catch (err) {
      console.error('Ошибка загрузки списка криптовалют:', err);
      setError('Не удалось загрузить список криптовалют');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrency = async () => {
    if (!currencyId) return;
    
    try {
      setLoading(true);
      setError(null);
      setCurrencyData(null);
      
      // Тоже относительный путь
      const resp = await api.get(`/cryptocurrencies/${currencyId}`);
      setCurrencyData(resp.data);
    } catch (err) {
      console.error('Ошибка загрузки данных криптовалюты:', err);
      setError('Не удалось загрузить данные криптовалюты');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (currencyId) {
      fetchCurrency();
    }
  }, [currencyId]);

  const handleMenuClick = (e) => {
    setCurrencyId(e.key);
  };

  // Показываем загрузку
  if (loading && !currencyData) {
    return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
  }

  // Показываем ошибку
  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className='flex h-screen'>
      <Menu
        onClick={handleMenuClick}
        mode="vertical"
        items={currencies}
        className='h-full overflow-y-auto w-64 border-r'
        style={{ minWidth: '200px' }}
      />
      <div className='flex-1 p-8 overflow-y-auto'>
        {currencyData ? (
          <CryptocurrencyCard currency={currencyData} />
        ) : (
          <div className="text-center text-gray-500 mt-10">
            Выберите криптовалюту из списка
          </div>
        )}
      </div>
    </div>
  );
};

export default App;