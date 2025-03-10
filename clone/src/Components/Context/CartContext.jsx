import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const carturl = `http://localhost:4000/products`;

    const [cartData, SetCartData] = useState([]);
    const [loading, setLoading] = useState(false);

    let prevData = JSON.parse(localStorage.getItem("orderpageData")) || [];
    const [orderpageData, setOrderpageData] = useState([...prevData]);

    localStorage.setItem("orderpageData", JSON.stringify(orderpageData));

    const [globalAddress, setGlobalAddress] = useState({});

    function getData() {
        setLoading(true);
        fetch(carturl)
            .then((res) => res.json())
            .then((res) => {
                console.log(res, "Fetched cart data");
                SetCartData(res);
            })
            .catch((err) => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <CartContext.Provider value={{
            cartData, SetCartData, loading,
            setOrderpageData, orderpageData,
            setLoading, getData, globalAddress, setGlobalAddress, carturl
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
