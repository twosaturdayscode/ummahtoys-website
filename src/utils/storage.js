const saveToStorage = (data, key) => {
  const string = JSON.stringify(data);
  localStorage.setItem(key, string);
};

const getFromStorage = (key) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
};

const clearFromStorageByKey = (key) => localStorage.removeItem(key);

const STORAGE_KEY = "woo-cart";

export const saveCartToStorage = (data) => saveToStorage(data, STORAGE_KEY);

export const getCartFromStorage = () => getFromStorage(STORAGE_KEY);

export const clearCartFromStorage = () => clearFromStorageByKey(STORAGE_KEY);
