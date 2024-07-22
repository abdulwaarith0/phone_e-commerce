import { createContext, useReducer, ReactNode, useEffect } from "react";
import { storeProducts, detailProduct } from "../data";


interface Product {
    id: number;
    title: string;
    img: string;
    price: number;
    inCart: boolean;
}

interface InitialState {
    products: Product[];
    detailProduct: Product;
}

interface contextType extends InitialState {
    setProducts: () => void;
    handleDetail: () => void;
    addToCart: () => void;
}


type Action =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "HANDLE_DETAIL" }
    | { type: "ADD_TO_CART" };


const initialState = {
    products: [],
    detailProduct,
};

export const ProductContext = createContext<contextType | undefined>(undefined);


const reducer = (state: InitialState, action: Action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "HANDLE_DETAIL":
            return state;
        case "ADD_TO_CART":
            return state;
        default:
            return state;
    }
};


const ProductProvider = ({ children }: { children: ReactNode }) => {

    useEffect(() => {
        setProducts();
    }, []);

    const [state, dispatch] = useReducer(reducer, initialState);

    const setProducts = () => {
        const products = storeProducts.map(item => ({
            ...item
        }));
        dispatch({
            type: "SET_PRODUCTS", payload:
                products
        });
    };

    const handleDetail = () => {
        console.log("Hello handle details");
        dispatch({ type: "HANDLE_DETAIL" });
    };

    const addToCart = () => {
        console.log("Hello handle cart");
        dispatch({ type: "ADD_TO_CART" });
    };

    return (
        <ProductContext.Provider value={{ ...state, setProducts, handleDetail, addToCart }}>
            {children}
        </ProductContext.Provider>
    );
};


const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider };