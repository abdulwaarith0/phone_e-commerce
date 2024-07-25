

export interface Product {
    id: number;
    title: string;
    img: string;
    price: number;
    inCart: boolean;
    company: string;
    info: string;
    count: number;
    total: number;
}

export interface InitialState {
    products: Product[];
    detailProduct: Product;
    cart: Product[];
    modalOpen: boolean;
    modalProduct: Product,
    cartSubTotal: number;
    cartTax: number;
    cartTotal: number;
}

export interface contextType extends InitialState {
    setProducts: () => void;
    handleDetail: (id: number) => void;
    addToCart: (id: number) => void;
    openModal: (id: number) => void;
    closeModal: () => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    increment: (id: number) => void;
    decrement: (id: number) => void;
}


export type Action =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "HANDLE_DETAIL", payload: Product | undefined }
    | { type: "ADD_TO_CART", payload: Product }
    | { type: "OPEN_MODAL", payload: Product }
    | { type: "CLOSE_MODAL" }
    | { type: "REMOVE_ITEM", payload: number }
    | { type: "CLEAR_CART" }
    | { type: "INCREMENT", payload: number }
    | { type: "DECREMENT", payload: number };



export const Reducer = (state: InitialState, action: Action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "HANDLE_DETAIL":
            return { ...state, detailProduct: action.payload };
        case "ADD_TO_CART":
            return { ...state, products: updatedProducts(state.products, action.payload), cart: [...state.cart, action.payload] };
        case "OPEN_MODAL":
            return { ...state, modalProduct: action.payload, modalOpen: true };
        case "CLOSE_MODAL":
            return { ...state, modalOpen: false };
        case "REMOVE_ITEM":
            return {
                ...state, products: updatedProducts(state.products, state.cart.find((p: Product) => p.id === action.payload)!),
                cart: state.cart.filter((p: Product) => p.id !== action.payload)
            };
        case "CLEAR_CART":
            return { ...state, cart: [] };
        case "INCREMENT":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload ? { ...item, count: item.count + 1, total: item.total + item.price } : item
                ),
            };
        case "DECREMENT":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload && item.count > 1
                        ? { ...item, count: item.count - 1, total: item.total - item.price }
                        : item
                ),
            };
        default:
            return state;
    }
};

const updatedProducts = (products: Product[], product: Product): Product[] => {
    return products.map((p) => (p.id) === product.id ? product : p);
}