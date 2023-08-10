import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { setSizeFilter } from "../../state-management/features/filterSlice";
import { useAppDispatch } from "../../state-management/hooks";
type Props = {
  size: string[];
};
type AvailableSizeType = {
  item: string;
};

const availableSizes = ["xs", "s", "m", "l", "xl"];
const SizesBox = ({ size }: Props) => {
  const dispatch = useAppDispatch();

  const toggleSize = (value: string) => {
    dispatch(setSizeFilter(value));
  };

  console.log(size);
  const isSizeSelected = (item: string) => size.includes(item);

  const renderSizeItem = ({ item }: AvailableSizeType) => (
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
