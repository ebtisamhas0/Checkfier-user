import { createContext, useContext, useState, useEffect } from 'react';
import { serverUrl } from '../config';

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

const StoreProvider = ({ children }) => {
  const [store, setStore] = useState({ logo: '', name: '', color: '' });

  useEffect(() => {
    // Retrieve the store ID from the 'storeId' cookie
   
    // Extract the store name from the URL path
    const storeName = window.location.pathname.split('/').pop();
  
    // Construct the URL to fetch store data
    const url = `${serverUrl}/store/${storeName}`;
  
fetch(url)
.then(response => response.json())
.then(data => {
  // Decode the logo image data from base64 to binary data
  const binaryData = atob(data.logo);
  // Convert the binary data to a Uint8Array
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }
  // Create a Blob object from the Uint8Array and get the data URL
  const blob = new Blob([uint8Array], { type: 'image/png' });
  const url = URL.createObjectURL(blob);
  // Set the logo property of the store state to the data URL
  setStore({ logo: url, name: data.name, color: data.color, id: data.storeId });

  // Set the store ID in a cookie with domain and path options
  document.cookie = `storeId=${data.storeId}; domain=localhost; path=/`;
})
.catch(error => {
  console.error('Error fetching store data:', error);
});
})
  


  return (
    <StoreContext.Provider value={{ store }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
