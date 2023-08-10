import Vendors from "../screens/vendors/home";
import Icon from "react-native-vector-icons/FontAwesome5";
import ShopIndex from "../screens/vendors/shop";
import Bag from "../screens/vendors/bag";
import Favourite from "../screens/vendors/favorite";
import Profile from "../screens/vendors/profile";

export const RoutesList = [
  {
    name: "Home",
    component: Vendors,
    options: {
      tabBarIcon: (props: any) => (
        <Icon name="home" size={"large"} color={"#DB3022"} {...props} />
      ),
      tabBarLabel: "Home",
      tabBarActiveTintColor: "#DB3022",
      tabBarInactiveTintColor: "#9B9B9B",
    },
  },
  {
    name: "Shop",
    component: ShopIndex,
    options: {
      tabBarIcon: (props: any) => (
        <Icon
          name="shopping-cart"
          size={"large"}
          color={"#DB3022"}
          {...props}
        />
      ),
      tabBarLabel: "Shop",
      tabBarActiveTintColor: "#DB3022",
      tabBarInactiveTintColor: "#9B9B9B",
    },
  },
  {
    name: "Bag",
    component: Bag,
    options: {
      tabBarIcon: (props: any) => (
        <Icon name="shopping-bag" size={"large"} color={"#DB3022"} {...props} />
      ),
      tabBarLabel: "Bag",
      tabBarActiveTintColor: "#DB3022",
      tabBarInactiveTintColor: "#9B9B9B",
    },
  },
  {
    name: "Favourite",
    component: Favourite,
    options: {
      tabBarIcon: (props: any) => (
        <Icon
          name="favorite-border"
          size={"large"}
          color={"#DB3022"}
          {...props}
        />
      ),
      tabBarLabel: "Favourite",
      tabBarActiveTintColor: "#DB3022",
      tabBarInactiveTintColor: "#9B9B9B",
    },
  },
  {
    name: "Profile",
    component: Profile,
    options: {
      tabBarIcon: (props: any) => (
        <Icon
          name="person-outline"
          size={"large"}
          color={"#DB3022"}
          {...props}
        />
      ),
      tabBarLabel: "Profile",
      tabBarActiveTintColor: "#DB3022",
      tabBarInactiveTintColor: "#9B9B9B",
    },
  },
];
