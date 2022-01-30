import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import AppUtils from '../utils/AppUtils';
import Card from '../components/card/Card';
import { Helmet } from 'react-helmet';
import RouteConstants from '../constants/RouteConstants';
import { addQueryParamsToUrl } from '../utils/UrlUtils';
import { login } from '../app/slices/userSlice';
import unsecureComponent from '../components/UnsecureComponent';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const LoginScreen = (props) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormInputChange = (name, value) => {
    const data = { ...formValues, [name]: value };
    setFormValues(data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(
        login({
          email: formValues.email,
          password: formValues.password,
        })
      ).unwrap();
      const url = addQueryParamsToUrl(RouteConstants.REDIRECT, {
        token: response.data.token,
        refreshToken: response.data.refreshToken,
      });
      navigate(url, { replace: true });
    } catch (error) {
      toast(
        AppUtils.errorToastMessage({
          title: 'Login failed',
          description: error.message,
        })
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Util.io | Login</title>
      </Helmet>
      <Box
        style={{ margin: 'auto' }}
        width={{
          xs: '95%',
          sm: '70%',
          md: '50%',
          lg: '40%',
          xl: '40%',
          '2xl': '35%',
        }}
      >
        <Card p={4}>
          <Card.Header title="Login" />
          <Card.Content p={4} textAlign="left">
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    )
                  }
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    )
                  }
                />
              </FormControl>
              <HStack pt={5} fontSize={15} justifyContent="space-between">
                <Link as={RouterLink} to={RouteConstants.REGISTER}>
                  Don't have an account?
                </Link>
                <Link as={RouterLink} to={RouteConstants.FORGOT_PASSWORD}>
                  Forgot password
                </Link>
              </HStack>
              <Box mt={7} textAlign="center">
                <Button type="submit" isLoading={loading}>
                  Sign In
                </Button>
              </Box>
            </form>
          </Card.Content>
        </Card>
      </Box>
    </>
  );
};

export default unsecureComponent(LoginScreen);
