import './App.css';

import { Route, Routes } from 'react-router-dom';

import AnalyticsScreen from './pages/expense/AnalyticsScreen';
import ExpensePageSetup from './pages/ExpensePageSetup';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import Header from './components/Header';
import LoginScreen from './pages/LoginScreen';
import NotFoundScreen from './pages/NotFoundScreen';
import OverviewScreen from './pages/expense/OverviewScreen';
import RedirectScreen from './pages/RedirectScreen';
import RegisterScreen from './pages/RegisterScreen';
import RouteConstants from './constants/RouteConstants';
import { VStack } from '@chakra-ui/react';

const App = () => {
  return (
    <VStack as='main' height='100vh'>
      <Header />
      <Routes>
        <Route path={RouteConstants.LOGIN} element={<LoginScreen />} />
        <Route
          path={RouteConstants.FORGOT_PASSWORD}
          element={<ForgotPasswordScreen />}
        />
        <Route path={RouteConstants.REGISTER} element={<RegisterScreen />} />
        <Route path={RouteConstants.REDIRECT} element={<RedirectScreen />} />
        <Route
          path={RouteConstants.OVERVIEW}
          element={
            <ExpensePageSetup
              key='overview'
              title='Overview | Expense Tracker'
              component={<OverviewScreen />}
            />
          }
        />
        <Route
          path={RouteConstants.ANALYTICS}
          element={
            <ExpensePageSetup
              key='analytics'
              title='Analytics | Expense Tracker'
              component={<AnalyticsScreen />}
            />
          }
        />
        <Route exact path='*' element={<NotFoundScreen />} />
      </Routes>
    </VStack>
  );
};

export default App;
