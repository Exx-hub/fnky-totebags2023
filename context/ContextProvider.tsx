import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { PopulatedCartItem } from "../types/interfaces";

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartContext = createContext<any>(null);

const ContextProvider = ({ children }: ContextProviderProps) => {
  const session = useSession();
  const [cartItems, setcartItems] = useState([]);

  const cartQuantity = cartItems.reduce(
    (acc: number, item: PopulatedCartItem) => {
      return acc + item.quantity;
    },
    0
  );

  const email = session.data?.user?.email;

  useEffect(() => {
    if (email) {
      fetch(`/api/cartItems/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setcartItems(data?.cartItems);
        });
    }
  }, [email]);

  return (
    <ShoppingCartContext.Provider value={{ cartQuantity }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ContextProvider;
