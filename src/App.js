import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import PageLoader from './components/PageLoader';
import RouteConstants from './constants/RouteConstants';
import { VStack } from '@chakra-ui/react';

const AnalyticsScreen = lazy(() => import('./pages/expense/AnalyticsScreen'));
const ExpensePageSetup = lazy(() => import('./pages/ExpensePageSetup'));
const ForgotPasswordScreen = lazy(() => import('./pages/ForgotPasswordScreen'));
const Header = lazy(() => import('./components/Header'));
const LoginScreen = lazy(() => import('./pages/LoginScreen'));
const NotFoundScreen = lazy(() => import('./pages/NotFoundScreen'));
const OverviewScreen = lazy(() => import('./pages/expense/OverviewScreen'));
const RedirectScreen = lazy(() => import('./pages/RedirectScreen'));
const RegisterScreen = lazy(() => import('./pages/RegisterScreen'));

const App = () => {
  return (
    <VStack as='main' height='100vh'>
      <Suspense fallback={<PageLoader title='Loading ...' />}>
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
      </Suspense>
    </VStack>
  );
};

export default App;
