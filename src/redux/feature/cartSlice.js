import {createSlice} from "@reduxjs/toolkit";
import data from "../../data";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: data,
        totalAmount: 0,
        totalCount: 0,
    },
    reducers: {
        getCartTotal: (state) => {
            let { totalAmount, totalCount } = state.items.reduce((cartTotal, cartItem) => {
                const {price, amount} = cartItem;
                const itemTotal = price * amount;
                cartTotal.totalAmount += itemTotal;
                cartTotal.totalCount += amount;
                return cartTotal;
            }, {totalAmount: 0, totalCount: 0}
            );
            state.totalAmount = parseInt(totalAmount.toFixed(2));
            state.totalCount = totalCount;
        },
        increase: (state, action) => {
            state.items = state.items.map((item) => {
                if(item.id === action.payload){
                    return {...item, amount: item.amount + 1};
                } else {
                    return item;
                }
            });
        },
        remove: (state, action) => {
            state.items = state.items.filter(item => {
                return item.id !== action.payload;
            } ); 
        },
        decrease: (state, action) => {
            state.items = state.items.map((item) => {
                if(item.id === action.payload){
                    return {...item, amount: item.amount -1};
                } else {
                    return item;
                }
            }).filter(item => item.amount !== 0);
        },
        clear: (state) => {
            state.items = [];
            state.totalAmount =0;
            state.totalCount = 0;
        },
        getCartItems: (state) => {
            state.items = data;
        }
    },
});

export const { getCartTotal, increase, remove, decrease, clear, getCartItems } = cartSlice.actions;
export default cartSlice.reducer;