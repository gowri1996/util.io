import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';

import AnalyticsScreen from './pages/wallet/AnalyticsScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import Header from './components/Header';
import LoginScreen from './pages/LoginScreen';
import NotFoundScreen from './pages/NotFoundScreen';
import OverviewScreen from './pages/wallet/OverviewScreen';
import ProductsScreen from './pages/ProductsScreen';
import RedirectScreen from './pages/RedirectScreen';
import RegisterScreen from './pages/RegisterScreen';
import RouteConstants from './constants/RouteConstants';
import { VStack } from '@chakra-ui/react';
import WalletPageSetup from './pages/wallet/WalletPageSetup';
import UserSettings from './pages/user-settings';

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
          element={<Navigate replace to={RouteConstants.WALLET_OVERVIEW} />}
        />
        <Route
          path={RouteConstants.WALLET_OVERVIEW}
          element={
            <WalletPageSetup
              key="overview"
              title="Wallet | Overview"
              component={<OverviewScreen />}
            />
          }
        />
        <Route
          path={RouteConstants.WALLET_ANALYTICS}
          element={
            <WalletPageSetup
              key="analytics"
              title="Wallet | Analytics"
              component={<AnalyticsScreen />}
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
