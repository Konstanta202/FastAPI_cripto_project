import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import CryptocurrencyCard from "./components/CryptocurrencyCard.jsx"
import { Menu } from 'antd';
import axios from 'axios';
const App = () => {

  const [currencies, setCurrencis] = useState([])
  const [currencyId, setCurrencyId] = useState(1)
  const [currencyData, setCurrencyData] = useState(null)

  const fetchCurrencies = () => {
    axios.get('http://localhost:8000/cryptocurrencies/').then(resp => {
      const currenciesRespones = resp.data
      const menuItems = [
        {
          label: "Список криптовалют",
          children: currenciesRespones.map(c => {
            return {label: c.name, key: c.id}
          }),
          type: 'group'
        }
      ]
      setCurrencis(menuItems)
    })
  }

    const fetchCurrency = () => {
    axios.get(`http://localhost:8000/cryptocurrencies/${currencyId}`).then(resp => {
      setCurrencyData(resp.data)
    })
  }

  useEffect(() => {
    fetchCurrencies()
  }, [])

  useEffect(() => {
    setCurrencyData(null)
    fetchCurrency()
  }, [currencyId])

  const [current, setCurrent] = useState('mail');
  const onClick = e => {
    setCurrencyId(e.key);
  };
  return (
    <div className='flex'>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="vertical"
        items={currencies}
        className='h-screen overflow-scroll'
      />,
      <div className='mx-auto my-auto'>
        <CryptocurrencyCard currency={currencyData}/>
      </div>
    </div>
  );
};
export default App;