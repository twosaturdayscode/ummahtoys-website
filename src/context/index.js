import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ToastMsg from "../components/ToastMsg";
import { isClient, getProductIndexById, getProductIndex } from "../utils";
import { getCartFromStorage, saveCartToStorage } from "../utils/storage";

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // First see if there is already a cart saved in user's browser, else create an empty one
  useEffect(() => {
    if (isClient()) {
      const cartData = getCartFromStorage();
      if (cartData) {
        setCart(cartData);
      } else {
        saveCartToStorage([]);
      }
    }
  }, []);

  // Each time 'cart' is changed we save it in the localStorage
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  /* NOTE: In order to update the state always copy it first, modify the copy as you wish, then pass it to setCart */

  // If product already in the cart, add the quantity
  const addItemToCart = (product, quantity) => {
    const newCartState = [...cart];
    const productIndex = getProductIndex(product, newCartState);
    console.log(productIndex);
    if (productIndex !== -1) {
      newCartState[productIndex].quantity += quantity;
    } else {
      newCartState.push({ ...product, quantity: quantity });
    }
    toast(<ToastMsg />);
    setCart(newCartState);
  };

  const removeItemFromCart = (id) => {
    const newCartState = cart.filter((product) => product.id !== id);
    setCart(newCartState);
  };

  const addToProductQuantity = (id, value) => {
    const newCartState = [...cart];
    const i = getProductIndexById(id, newCartState);
    newCartState[i].quantity += value;
    setCart(newCartState);
  };

  const getTotalValue = () => {
    return cart.reduce((acc, cartItem) => {
      return acc + cartItem.quantity * cartItem.price;
    }, 0);
  };

  // Returns the count of the items in the cart
  const getCartItemsCount = () => cart.length;

  const isCartEmpty = () => cart.length === 0;

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        getCartItemsCount,
        getTotalValue,
        isCartEmpty,
        addToProductQuantity,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
