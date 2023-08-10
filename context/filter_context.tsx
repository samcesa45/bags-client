import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import filterReducer from "./filterReducer";
import productType from "../type/model";
type ChildrenProps = {
  children: React.ReactNode;
};
export const FilterContext = createContext(null);
export const FilterDispatchContext = createContext(null);

export default function FilterContextProvider({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer<React.ReducerWithoutAction<any>>(
    filterReducer,
    initialState
  );

  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  //sorting function
  const sorting = (event: ChangeEvent<HTMLInputElement>) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  //update the filter values
  const updateFilterValue = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  //to sort the product
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);

  return (
    <FilterContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterContext.Provider>
  );
}

export const initialState = {
  filter_products: productType,
  all_products: productType,
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    brand: "all",
    color: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
    size: "l",
  },
};
