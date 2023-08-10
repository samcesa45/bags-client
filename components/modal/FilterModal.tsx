import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { ColorPicker } from "react-native-btr";
import SizesBox from "../sizeBox/SizeBox";
import CategoryBox from "../categoryBox/CategoryBox";
import Container from "../Container";
import Icons from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import { selectAllBrands } from "../../state-management/features/brandSlice";
import BrandModal from "./BrandModal";
import { categoryType, productType } from "../../type/model";
import { selectAllProducts } from "../../state-management/features/productsSlice";
import { selectAllCategories } from "../../state-management/features/categoriesSlice";
import {
  filters,
  setCategoryFilter,
  setColorFilter,
  setPriceFilter,
  setSizeFilter,
} from "../../state-management/features/filterSlice";
type priceType = {
  min: number;
  max: number;
};
type Props = {
  setFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalFilterVisible: boolean;
  // selectedBrands: string;
  // setSelectedBrands: () => void;
  price: priceType;
  color: string;
  size: string[];
  category: string[];
  applyFilters: () => void;
};
let { width } = Dimensions.get("window");
let { height } = Dimensions.get("window");
function FilterModal({
  modalFilterVisible,
  setFilterModalVisible,
  // selectedBrands,
  // setSelectedBrands,
  price,
  color,
  size,
  category,
  applyFilters,
}: Props) {
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const brands = useAppSelector(selectAllBrands);
  const dispatch = useAppDispatch();
  const [showSearchModal, setShowSearchModal] = React.useState(false);
  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);

  const handlePriceRangeChange = (price: number[]) =>
    dispatch(setPriceFilter(price));

  const handleColorChange = (color: string) => dispatch(setColorFilter(color));

  return (
    <Modal
      propagateSwipe={true}
      isVisible={modalFilterVisible}
      style={styles.modal}
    >
      <Container isScrollable={true} style={{ flex: 1 }}>
        <Text
          className="text-center pt-[36px] text-[#222] text-[18px] font-bold leading-[120%]"
          style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
        >
          Filters
        </Text>
        <View>
          <Text
            className=" pl-[16px] pt-[32px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
          >
            Price range
          </Text>
          <View className="pl-4 bg-white mt-4" style={{ elevation: 2 }}>
            <ScrollView scrollEnabled={scrollEnabled}>
              <MultiSlider
                isMarkersSeparated={true}
                values={[price.min, price.max]}
                trackStyle={{
                  height: 3,
                  backgroundColor: "#9B9B9B",
                }}
                selectedStyle={{
                  backgroundColor: "#B82222",
                }}
                onValuesChange={handlePriceRangeChange}
                onValuesChangeStart={disableScroll}
                onValuesChangeFinish={handlePriceRangeChange}
                min={price.min}
                max={price.max}
                step={10}
                containerStyle={{
                  height: 20,
                  paddingLeft: 16,
                  marginTop: 52,
                  paddingBottom: 34,
                }}
                customMarkerLeft={CustomSliderMarkerLeft}
                customMarkerRight={CustomSliderMarkerRight}
              />
            </ScrollView>
          </View>
        </View>
        <View>
          <Text
            className=" pl-[16px] pt-[32px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
          >
            Colors
          </Text>
          <View className="bg-white h-[100px] mt-2" style={{ elevation: 2 }}>
            <View className="pt-4 relative">
              <ColorPicker
                onSelect={handleColorChange}
                selectedColor={color}
                colors={["black", "red", "grey", "orange", "green"]}
              />
            </View>
          </View>
        </View>
        <View>
          <Text
            className=" pl-[16px] pt-[32px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
          >
            Sizes
          </Text>
          <View className="bg-white h-[100px] mt-2" style={{ elevation: 2 }}>
            <SizesBox size={size} />
          </View>
        </View>
        <View className="">
          <Text
            className=" pl-[16px] pt-[32px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
          >
            Category
          </Text>

          <View className="bg-white mt-2" style={{ elevation: 2 }}>
            <CategoryBox category={category} />
          </View>
        </View>
        <View className="pt-[32px]">
          <View className="flex flex-row justify-between items-center w-[334px]">
            <Text
              className=" pl-[16px]  text-[#222] text-[18px] font-bold leading-[120%]"
              style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
            >
              Brand
            </Text>
            <Pressable onPress={() => setShowSearchModal(true)}>
              <Icons name="chevron-forward" size={24} color="#222" />
            </Pressable>
          </View>
          <View className="flex flex-row flex-wrap pl-4">
            {brands.length > 0 ? (
              [...brands].slice(0, 3).map((brand) => (
                <View key={brand.id} className="flex flex-row justify-between">
                  <View>
                    <Text
                      className="text-[#9B9B9B] text-[11px] leading-normal font-medium"
                      style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
                    >
                      {brand.name}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-[#9B9B9B]">No brand available</Text>
            )}
          </View>
        </View>
        <View className="pb-[68px] mt-4">
          <View className="flex flex-row justify-evenly">
            <Pressable onPress={() => setFilterModalVisible(false)}>
              <View className="w-[160px] h-9 border border-[#222222] rounded-[24px] flex flex-row items-center justify-center ">
                <Text
                  className="text-sm font-medium"
                  style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
                >
                  Discard
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                applyFilters();
                setFilterModalVisible(false);
              }}
            >
              <View
                className="w-[160px] h-9 border border-[#DB3022] bg-[#DB3022] rounded-[24px] flex flex-row items-center justify-center "
                style={{
                  shadowColor: "rgb(211,38,38)",
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 2,
                }}
              >
                <Text
                  className="text-sm font-medium text-white"
                  style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
                >
                  Apply
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Container>
      {/* <BrandModal
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
        brands={brands}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        applyFilters={applyFilters}
        setFilterModalVisible={setFilterModalVisible}
      /> */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: -20,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    right: -10,
    height: height,
    width: width,
    backgroundColor: "#F9F9F9",
    paddingLeft: 16,
    marginLeft: -40,
  },
});

export default FilterModal;
const CustomSliderMarkerLeft = (e: any) => (
  <View className="h-[70px]">
    <Text style={{ color: "#222" }}>${e.currentValue}</Text>
  </View>
);
const CustomSliderMarkerRight = (e: any) => (
  <View className="h-[70px]">
    <Text style={{ color: "#222" }}>${e.currentValue}</Text>
  </View>
);
