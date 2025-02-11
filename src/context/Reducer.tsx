import Product from "../components/products";


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
    detailProduct: Product | undefined;
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
    clientSecret: string;
}


export type Action =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "HANDLE_DETAIL", payload: Product | undefined}
    | { type: "ADD_TO_CART", payload: Product }
    | { type: "OPEN_MODAL", payload: Product }
    | { type: "CLOSE_MODAL" }
    | { type: "REMOVE_ITEM", payload: number }
    | { type: "CLEAR_CART" }
    | { type: "INCREMENT", payload: number }
    | { type: "DECREMENT", payload: number };



export const Reducer = (state: InitialState, action: Action): InitialState => {
    let incrementedItem: Product | undefined;
    let decrementedItem: Product | undefined;
    let removedProduct: Product | undefined;

    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };

        case "HANDLE_DETAIL":
            return { ...state, detailProduct: action.payload };

        case "ADD_TO_CART":
            return {
                ...state, products:
                    updatedProducts(state.products, action.payload),
                cart: [...state.cart, action.payload],
                cartSubTotal: state.cartSubTotal + action.payload.price,
                cartTax: Number(((state.cartSubTotal + action.payload.price) * 0.1).toFixed(2)),
                cartTotal: Number(((state.cartSubTotal + state.cartTax + action.payload.price).toFixed(2))),
            };

        case "OPEN_MODAL":
            return { ...state, modalProduct: action.payload, modalOpen: true };

        case "CLOSE_MODAL":
            return { ...state, modalOpen: false };

        case "REMOVE_ITEM":
            removedProduct = state.cart.find((p: Product) => p.id === action.payload)!;
            if (removedProduct) {
                // eslint-disable-next-line no-case-declarations
                const updateProduct = state.products.map((product) =>
                    product.id === removedProduct!.id
                        ? { ...product, inCart: false }
                        : product
                );

                return {
                    ...state,
                    products: updateProduct,
                    cart: state.cart.filter((p: Product) => p.id !== action.payload),
                    cartSubTotal: state.cartSubTotal - removedProduct.total,
                    cartTax: (state.cartSubTotal - removedProduct.total) * 0.1,
                    cartTotal: state.cartSubTotal - removedProduct.total + (state.cartSubTotal - removedProduct.total) * 0.1,
                };
            }
            return state;

        case "CLEAR_CART":
            // eslint-disable-next-line no-case-declarations
            const updatedProduct = state.products.map((product) => ({
                id: product.id,
                title: product.title,
                img: product.img,
                price: product.price,
                inCart: false,
                company: product.company,
                info: product.info,
                count: 0,
                total: 0,
            }));
            return {
                ...state,
                cart: [],
                cartSubTotal: 0,
                cartTax: 0,
                cartTotal: 0,
                products: updatedProduct,
            };

        case "INCREMENT":
            incrementedItem = state.cart.find((p: Product) => p.id === action.payload);
            if (incrementedItem) {
                const updatedCartItem = { ...incrementedItem, count: incrementedItem.count + 1, total: incrementedItem.total + incrementedItem.price };
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload ? updatedCartItem : item
                    ),
                    cartSubTotal: state.cartSubTotal + incrementedItem.price,
                    cartTax: Number(((state.cartSubTotal + incrementedItem.price) * 0.1).toFixed(2)),
                    cartTotal: Number(((state.cartSubTotal + state.cartTax + incrementedItem.price).toFixed(2))),
                };
            }
            return state;

        case "DECREMENT":
            decrementedItem = state.cart.find((p: Product) => p.id === action.payload);
            if (decrementedItem && decrementedItem.count > 1) {
                const updatedCartItem = { ...decrementedItem, count: decrementedItem.count - 1, total: decrementedItem.total - decrementedItem.price };
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload ? updatedCartItem : item
                    ),
                    cartSubTotal: state.cartSubTotal - decrementedItem.price,
                    cartTax: Number(((state.cartSubTotal - decrementedItem.price) * 0.1).toFixed(2)),
                    cartTotal: Number(((state.cartSubTotal - decrementedItem.price - (state.cartSubTotal - decrementedItem.price) * 0.1).toFixed(2))),
                };
            }
            return state;

        default:
            return state;
    }
};

const updatedProducts = (products: Product[], product: Product): Product[] => {
    return products.map((p) => (p.id) === product.id ? product : p);
}