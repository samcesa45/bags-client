import React, { useState, useEffect } from "react";

import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import Container from "../Container";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  getAllBrands,
  selectAllBrands,
} from "../../state-management/features/brandSlice";
import CheckBox from "expo-checkbox";
import { Spinner } from "../Spinner";
import { brandType } from "../../type/model";

type Props = {
  showSearchModal: boolean;
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  brands: brandType[];
  selectedBrands: string;
  setSelectedBrands: React.Dispatch<React.SetStateAction<boolean[]>>;
  applyFilters: () => void;
  setFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
let { height } = Dimensions.get("window");
let { width } = Dimensions.get("window");
const BrandModal = ({
  showSearchModal,
  setShowSearchModal,
  brands,
  setFilterModalVisible,
  selectedBrands,
  setSelectedBrands,
  applyFilters,
}: Props) => {
  // const brands = useAppSelector(selectAllBrands);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    Array(brands.length).fill(false)
  );

  const handleCheckBoxChange = (index: number) => {
    setSelectedBrands((prevCheckedItems) =>
      prevCheckedItems.map((checked, i) => (i === index ? !checked : checked))
    );
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllBrands())
      .unwrap()
      .then((promiseResult) => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Modal
      propagateSwipe={true}
      isVisible={showSearchModal}
      style={styles.modal}
    >
      <Container isScrollable={true} style={{ flex: 1 }}>
        <View className="w-[343px] mx-4  mt-[44px]">
          <Text
            className="text-center font-medium text-[18px] leading-[22px] text-[#222]"
            style={{ fontFamily: "CircularStd", fontStyle: "italic" }}
          >
            Brand
          </Text>
          <TextInput
            value={search}
            placeholder="Search"
            onChangeText={(text) => setSearch(text)}
            className="border relative border-white rounded-[25px] bg-white h-[40px] text-[#222] px-[41px] mt-[21px]
            placeholder:text-[#9B9B9B] placeholder:text-[16px] placeholder:leading-normal placeholder:font-medium placeholder:italic"
            style={{ elevation: 5 }}
          />
          <Icon name="search" size={14} color="#8E8E93" style={styles.icon} />
        </View>
        <View>
          {!isLoading ? (
            filteredBrands.map((brand, index) => (
              <View
                className="flex flex-row justify-between w-[343px] m-3"
                key={brand.id}
              >
                <Text
                  className={`italic font-medium leading-normal text-[16px] ${
                    selectedBrands[index] ? "text-[#DB3022]" : "text-[#222]"
                  }`}
                  style={{
                    fontFamily: "CircularStd",
                  }}
                >
                  {brand.name}
                </Text>
                <CheckBox
                  disabled={false}
                  id={brand.id}
                  value={selectedBrands[index]}
                  onValueChange={() => handleCheckBoxChange(index)}
                  color={selectedBrands[index] ? "#DB3022" : "#222"}
                />
              </View>
            ))
          ) : (
            <Spinner />
          )}
        </View>
        <View className=" mt-[41px]">
          <View className="flex flex-row justify-evenly">
            <Pressable onPress={() => setShowSearchModal(false)}>
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
                applyFilters;
                setShowSearchModal(false);
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
    </Modal>
  );
};

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
  icon: {
    position: "absolute",
    top: 60,
    bottom: 13,
    left: 15,
  },
});

export default BrandModal;
