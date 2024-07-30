import { createContext, useReducer, ReactNode, useEffect, useState } from "react";
import { storeProducts, detailProduct } from '../data';
import { Reducer, contextType, InitialState, Product, Action } from "./Reducer";
import cart from "../components/cart";


const initialState: InitialState = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
};

export const ProductContext = createContext<contextType | undefined>(undefined);


const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [ clientSecret, setClientSecret ] = useState("")

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await fetch('/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ products: cart }),
                });
                const { clientSecret } = await response.json();
                setClientSecret(clientSecret);

            } catch (error) {
                console.error('Error fetching client secret:', error);
            }
        };
        fetchClientSecret();
    }, [cart]);

    useEffect(() => {
        setProducts();
    }, []);

    const [state, dispatch] = useReducer<
        (state: InitialState, action: Action) => InitialState
    >(Reducer, initialState);

    const setProducts = () => {
        const products = storeProducts.map(item => ({
            ...item,
            count: 0,
            total: 0
        }));
        dispatch({
            type: "SET_PRODUCTS", payload: products
        });
    };

    const getItem = (id: number) => {
        const product = state.products.find((item: Product) =>
            item.id === id);
        return product;
    }

    const handleDetail = (id: number) => {
        const product = getItem(id);
        dispatch({ type: "HANDLE_DETAIL", payload: product });
    };

    const addToCart = (id: number) => {
        const product = state.products.find((item: Product) => item.id === id)!;
        product.inCart = true;
        product.count = 1;
        product.total = product.price;
        dispatch({ type: "ADD_TO_CART", payload: product });
    };

    const openModal = (id: number) => {
        const product = state.products.find((item: Product) =>
            item.id === id)!;
        dispatch({ type: "OPEN_MODAL", payload: product });
    };

    const closeModal = () => {
        dispatch({ type: "CLOSE_MODAL" });
    };

    const increment = (id: number) => {
        dispatch({ type: "INCREMENT", payload: id});
    };

    const decrement = (id: number) => {
        dispatch({ type: "DECREMENT", payload: id});
    };

    const removeItem = (id: number) => {
        dispatch({ type: "REMOVE_ITEM", payload: id});
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    }


    return (
        <ProductContext.Provider value={{
            ...state,
            setProducts,
            handleDetail,
            addToCart,
            openModal,
            closeModal,
            increment,
            decrement,
            removeItem,
            clearCart,
            clientSecret,
        }}>
            {children}
        </ProductContext.Provider>
    );
};


const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider };