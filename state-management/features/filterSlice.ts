import { createSlice } from "@reduxjs/toolkit";
import { number } from "yup";
import { RootState } from "../store";
type priceType = {
  min: number;
  max: number;
};

type catType = {
  category: string[];
};

type sizeType = {
  size: string[];
};

const initialState = {
  price: { min: 20.0, max: 1000.0 },
  category: [],
  brand: "",
  size: [""],
  color: "",
};
const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPriceFilter: (state, action) => {
      state.price = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    setBrandFilter: (state, action) => {
      state.brand = action.payload;
    },
    setSizeFilter: (state, action) => {
      state.size = action.payload;
    },
    setColorFilter: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const {
  setPriceFilter,
  setCategoryFilter,
  setBrandFilter,
  setSizeFilter,
  setColorFilter,
} = filterSlice.actions;

export const filters = (state: RootState) => state.filter;
export default filterSlice.reducer;
