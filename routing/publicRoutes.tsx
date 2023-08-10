import ForgotPasswordScreen from "../screens/guest/ForgotPasswordScreen";
import LoginScreen from "../screens/guest/LoginScreen";
import RegisterScreen from "../screens/guest/RegisterScreen";

export const publicRoutes = [
  {
    name: "Register",
    component: RegisterScreen,
    options: { headerTitle: "", headerTransparent: true },
  },
  {
    name: "Login",
    component: LoginScreen,
    options: { headerTitle: "", headerTransparent: true },
  },
  {
    name: "ForgotPassword",
    component: ForgotPasswordScreen,
    options: { headerTransparent: true, headerTitle: "" },
  },
];
