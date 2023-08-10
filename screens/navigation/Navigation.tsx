import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import useLoading from "../../components/useLoading";
import Spinner from "react-native-loading-spinner-overlay";
import {
  selectIsAuthenticated,
  selectUserProfile,
  selectUserRole,
} from "../../state-management/features/usersSlice";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import AppStack from "./AdminStack";
import AuthStack from "./AuthStack";
import VendorStack from "./VendorStack";

type Props = {};

const Navigation = (props: Props) => {
  let isAuthenticatedAdmin = false;
  let isAuthenticatedVendors = false;
  const profile = useAppSelector(selectUserProfile);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRoles = useAppSelector(selectUserRole);

  if (
    profile &&
    !profile.is_platform_admin &&
    isAuthenticated === true &&
    userRoles &&
    userRoles.includes("customer")
  ) {
    isAuthenticatedVendors = true;
  } else if (profile && profile.is_platform_admin && isAuthenticated === true) {
    isAuthenticatedAdmin = true;
  }

  axios.defaults.baseURL = "https://59ad-160-119-127-230.ngrok-free.app/api";
  axios.defaults.withCredentials = true;
  const isLoading = useLoading();
  const dispatch = useAppDispatch();
  // const navigation = useNavigation();
  let login_status = false;
  let error_message = "";

  if (login_status) {
    return (
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
      />
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticatedAdmin ? (
        <AppStack />
      ) : isAuthenticatedVendors ? (
        <VendorStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
