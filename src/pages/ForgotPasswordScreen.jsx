import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';

import AppUtils from '../utils/AppUtils';
import Card from '../components/card/Card';
import { Helmet } from 'react-helmet';
import RouteConstants from '../constants/RouteConstants';
import { forgotPassword } from '../app/slices/userSlice';
import unsecureComponent from '../components/UnsecureComponent';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ForgotPasswordScreen = (props) => {
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
      await dispatch(
        forgotPassword({
          email: formValues.email,
          password: formValues.password,
        })
      ).unwrap();
      toast(
        AppUtils.successToastMessage({
          title: 'Reset password success',
          description: 'Login using the credentials',
        })
      );
      navigate(RouteConstants.LOGIN, { replace: true });
    } catch (error) {
      toast(
        AppUtils.errorToastMessage({
          title: 'Reset password failed',
          description: error.message,
        })
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Util.io | Forgot Password</title>
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
          <Card.Header title="Forgot Password" />
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
                <FormLabel>New Password</FormLabel>
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
              <Box mt={8} textAlign="center">
                <Button type="submit" isLoading={loading}>
                  Submit
                </Button>
              </Box>
            </form>
          </Card.Content>
        </Card>
      </Box>
    </>
  );
};

export default unsecureComponent(ForgotPasswordScreen);
