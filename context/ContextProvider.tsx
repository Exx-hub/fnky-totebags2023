import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartContext = createContext<any>(null);

const ContextProvider = ({ children }: ContextProviderProps) => {
  const session = useSession();
  const [cartItems, setcartItems] = useState([]);

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
    <ShoppingCartContext.Provider value={{ cartItems }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ContextProvider;
