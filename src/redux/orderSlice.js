import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [
    {
      id: null,
      name: '',
      price: 0
    }
  ]
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const { id, name, price } = action.payload

      state.name = name
      state.price = price
      state.id = id
    }
  }
})

export const { addOrder } = orderSlice.actions

export default orderSlice.reducer
