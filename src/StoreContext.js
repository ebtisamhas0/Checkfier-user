import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

const StoreProvider = ({ children }) => {
  const [store, setStore] = useState({ logo: '', name: '', color: '' });

  useEffect(() => {
    fetch('http://localhost:3000/store')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setStore(data);
      })
      .catch(error => {
        console.error('Error fetching store data:', error);
      });
  }, []);

  return (
    <StoreContext.Provider value={{ store }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

