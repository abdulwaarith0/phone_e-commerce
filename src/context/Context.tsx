import { createContext, useReducer, ReactNode, useEffect } from "react";
import { storeProducts, detailProduct } from "../data";


interface Product {
    id: number;
    title: string;
    img: string;
    price: number;
    inCart: boolean;
    company: string;
    info: string;
}

interface InitialState {
    products: Product[];
    detailProduct: Product;
}

interface contextType extends InitialState {
    setProducts: () => void;
    handleDetail: (id: number) => void;
    addToCart: (id: number) => void;
}


type Action =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "HANDLE_DETAIL", payload: Product | undefined }
    | { type: "ADD_TO_CART", payload: number };


const initialState: InitialState = {
    products: [],
    detailProduct,
};

export const ProductContext = createContext<contextType | undefined>(undefined);


const reducer = (state: InitialState, action: Action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "HANDLE_DETAIL":
            return {...state, detailProduct: action.payload};
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
            type: "SET_PRODUCTS", payload: products
        });
    };

    const getItem = (id: number) => {
        const product = state.products.find(item =>
            item.id === id);
            return product;
    }

    const handleDetail = (id: number) => {
        const product = getItem(id);
        dispatch({ type: "HANDLE_DETAIL", payload: product });
    };

    const addToCart = (id: number) => {
        let tempProducts = [...state.products];
        
        dispatch({ type: "ADD_TO_CART", payload: id });
    };

    return (
        <ProductContext.Provider value={{ ...state, setProducts, handleDetail, addToCart }}>
            {children}
        </ProductContext.Provider>
    );
};


const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider };