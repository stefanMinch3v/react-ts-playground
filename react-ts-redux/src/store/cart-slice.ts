import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[]
}

type PayloadActionType = {
  id: string;
  title: string;
  price: number;
}

const initialState: CartState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<PayloadActionType>) {
      const itemIndex = state.items.findIndex(x => x.id === action.payload.id);

      if (itemIndex < 0) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        // in redux toolkits we can directly mutate the data, not like react reducer hook where we have to always return new data
        state.items[itemIndex].quantity++;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(x => x.id === action.payload);

      if (itemIndex < 0) {
        return;
      }

      if (state.items[itemIndex].quantity === 1) {
        state.items.splice(itemIndex, 1);
      } else {
        state.items[itemIndex].quantity--;
      }
    }
  }
});

export const { addToCart: addToCartAction, removeFromCart: removeFromCartAction } = cartSlice.actions;