import { StatusBar } from "expo-status-bar";
import { View, ScrollView, Dimensions } from "react-native";
import { Provider } from "react-redux";
import { store } from "./state-management/store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator } from "react-native";
import Navigation from "./screens/navigation/Navigation";
import { useEffect, useState, useCallback } from "react";
// import Spinner from "react-native-loading-spinner-overlay";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "./components/Spinner";
let persistor = persistStore(store);
let { height } = Dimensions.get("window");
export default function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);
  const [fontsLoaded] = useFonts({
    CircularStd: require("./assets/fonts/CircularStdFont.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <StatusBar translucent={true} animated={true} style="auto" />
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
