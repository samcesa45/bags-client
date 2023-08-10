import { productType, categoryType } from "../type/model";

export type FilterCriteria = {
  // minPrice: number;
  // maxPrice: number;
  color: string;
  size: string[];
  category: string[];
  // brand: string;
};

export const getFilteredProducts = (
  products: productType[],
  categories: categoryType[],
  filterCriteria: FilterCriteria
): productType[] => {
  const { color, size, category } = filterCriteria;

  const categoryMapping = Object.fromEntries(
    categories
      .filter((cat) => cat.parent_id === null)
      .map((cat) => [cat?.name, cat?.id])
  );

  console.log(categoryMapping);

  //Map category names to IDs
  const categoryId = category.map((catName) => categoryMapping[catName]);

  console.log(categoryId);
  //filter based on price range
  // const filteredByPrice = products.filter(
  //   (product) =>
  //     product.final_unit_price &&
  //     product.final_unit_price >= minPrice &&
  //     product.final_unit_price <= maxPrice
  // );

  //filter based on color  (if selected) attribute not product.id
  const filteredByColor = color
    ? products.filter((product) => product.color === color)
    : products;

  //filter based on sizes (if selected)
  //product.size not product.name
  const filteredBySizes = size
    ? filteredByColor.filter((product) => size.includes(product.size!))
    : filteredByColor;

  //filter based on categories (if selected)

  const filteredByCategories =
    category.length > 0
      ? products.filter((product) => categoryId.includes(product.category_id!))
      : filteredBySizes;
  // const filteredByBrands = brand
  //   ? filteredBySizes.filter((product) => category.includes(product.brand_id!))
  //   : filteredByCategories;

  return filteredByCategories;
};

/**
 * 
 * import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
type Props = {
  size: string;
};
const availableSizes = ["xs", "s", "m", "l", "xl"];
const SizesBox = ({ size }: Props) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleSize = () => {
    setSelectedSizes((prevSelected: any) => {
      if (prevSelected.includes(size)) {
        //if the size is already selected, remove it from the array
        return prevSelected.filter((item: string) => item !== size);
      } else {
        // if the size is not selected , add it to the array
        return [...prevSelected, size];
      }
    });
  };

  const isSizeSelected = (size: string) => selectedSizes.includes(size);

  const renderSizeItem = ({ item }) => (
    <Pressable onPress={() => toggleSize(item)} className="pt-6">
      <View
        className={`w-10 h-10 mx-4 rounded-[8px] flex border border-[#9B9B9B] flex-row items-center justify-center ${
          isSizeSelected(item) ? "bg-[#DB3022] border-[#ffffff]" : "bg-white"
        }`}
      >
        <Text
          className={`text-center text-sm font-medium ${
            isSizeSelected(item) ? "text-white" : "text-[#222]"
          }`}
          style={{ fontFamily: "CircularStd", fontStyle: "normal" }}
        >
          {item}
        </Text>
      </View>
    </Pressable>
  );
  return (
    <View className="flex flex-row items-center justify-center">
      <FlatList
        data={availableSizes}
        renderItem={renderSizeItem}
        keyExtractor={(item) => item}
        numColumns={availableSizes.length}
      />
    </View>
  );
};

export default SizesBox;

 */
