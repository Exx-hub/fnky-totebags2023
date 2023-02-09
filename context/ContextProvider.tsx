import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState } from "react";
import { PopulatedItem } from "../types/interfaces";

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartContext = createContext<any>(null);

const ContextProvider = ({ children }: ContextProviderProps) => {
  const session = useSession();
  const [cartItems, setcartItems] = useState([]);

  const cartQuantity = cartItems.reduce((acc: number, item: PopulatedItem) => {
    return acc + item.quantity;
  }, 0);

  const email = session.data?.user?.email;

  const fetchCartItems = useCallback(() => {
    fetch(`/api/cartItems/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setcartItems(data?.cartItems);
      });
  }, [email]);

  useEffect(() => {
    if (email) {
      fetchCartItems();
    }
  }, [email, fetchCartItems]);

  return (
    <ShoppingCartContext.Provider value={{ cartQuantity, fetchCartItems }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ContextProvider;
