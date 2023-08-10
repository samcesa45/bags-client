// import productType from "../type/model";

import { productType } from "../type/model";
import { initialState } from "./filter_context";

export default function filterReducer(
  state = initialState,
  action: { type: string; payload: any[] }
) {
  const { text, category, brand, size, color, maxPrice, minPrice, price } =
    state.filters;
  let tempFilterProduct: productType[] = [];

  if (text) {
    tempFilterProduct = tempFilterProduct.filter((product) => {
      return product?.name.toLowerCase().includes(text);
    });
  }
  if (category) {
    tempFilterProduct = tempFilterProduct.filter((product) => {
      return product.category_id === category;
    });
  }
  if (brand) {
    tempFilterProduct = tempFilterProduct.filter((product) => {
      return product.brand_id === brand;
    });

    if (price) {
      tempFilterProduct = tempFilterProduct.filter((product) => {
        return product.final_unit_price === price;
      });
    }

    if (size) {
      tempFilterProduct = tempFilterProduct.filter((product) => {
        return product.size === size;
      });
    }
    if (color) {
      tempFilterProduct = tempFilterProduct.filter((product) => {
        return product.color === color;
      });
    }
  }

  return {
    ...state,
    filter_products: tempFilterProduct,
  };
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem: any) => curElem.price);
      let maxPrice = priceArr.reduce(
        (initialVal, curVal) => Math.max(initialVal, curVal),
        0
      );
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
      };
    case "SET_GRID_VIEW": {
      return { ...state, grid_view: true };
    }
    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };
    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      let newSortData;
      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];
  }
}
