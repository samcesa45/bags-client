import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { publicRoutes } from "./publicRoutes";
import { RoutesList } from "./routes";

const Tab = createBottomTabNavigator();

export default function TabNavigationStack({ isAuth }: any) {
  const [routes, setRoutes] = React.useState([...publicRoutes, ...RoutesList]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#DB3022",
          tabBarInactiveTintColor: "#9B9B9B",
        }}
      >
        {routes?.map((route: any, key: any) => {
          const { name, component, options } = route;
          return (
            <Tab.Screen
              key={key}
              name={name}
              component={component}
              options={options}
            />
          );
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
