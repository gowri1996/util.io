import "./App.css";

import { VStack } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import RouteConstants from "./constants/RouteConstants";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import LoginScreen from "./pages/LoginScreen";
import NotFoundScreen from "./pages/NotFoundScreen";
import ProductsScreen from "./pages/ProductsScreen";
import RedirectScreen from "./pages/RedirectScreen";
import RegisterScreen from "./pages/RegisterScreen";
import UserSettings from "./pages/user-settings";
import DashboardScreen from "./pages/wallet/DashboardScreen";
import TransactionScreen from "./pages/wallet/TransactionScreen";
import WalletPageSetup from "./pages/wallet/WalletPageSetup";

const App = () => {
  return (
    <VStack as="main" height="100vh">
      <Header />
      <Routes>
        <Route
          path={RouteConstants.BASE}
          element={<Navigate replace to={RouteConstants.LOGIN} />}
        />
        <Route path={RouteConstants.LOGIN} element={<LoginScreen />} />
        <Route
          path={RouteConstants.FORGOT_PASSWORD}
          element={<ForgotPasswordScreen />}
        />
        <Route path={RouteConstants.REGISTER} element={<RegisterScreen />} />
        <Route path={RouteConstants.REDIRECT} element={<RedirectScreen />} />
        <Route path={RouteConstants.PRODUCTS} element={<ProductsScreen />} />
        <Route
          path={RouteConstants.WALLET_BASE}
          element={<Navigate replace to={RouteConstants.WALLET_TRANSACTIONS} />}
        />
        <Route
          path={RouteConstants.WALLET_DASHBOARD}
          element={
            <WalletPageSetup
              key="dashboard"
              title="Wallet | Dashboard"
              component={<DashboardScreen />}
            />
          }
        />
        <Route
          path={RouteConstants.WALLET_TRANSACTIONS}
          element={
            <WalletPageSetup
              key="transactions"
              title="Wallet | Transactions"
              component={<TransactionScreen />}
            />
          }
        />
        <Route
          path={RouteConstants.USER_BASE}
          element={<Navigate replace to={RouteConstants.USER_SETTINGS} />}
        />
        <Route path={RouteConstants.USER_SETTINGS} element={<UserSettings />} />
        <Route exact path="*" element={<NotFoundScreen />} />
      </Routes>
    </VStack>
  );
};

export default App;
