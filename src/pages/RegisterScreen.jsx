import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { register } from "../app/slices/userSlice";
import Card from "../components/card/Card";
import unsecureComponent from "../components/UnsecureComponent";
import RouteConstants from "../constants/RouteConstants";
import AppUtils from "../utils/AppUtils";

const RegisterScreen = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFormInputChange = (name, value) => {
    const data = { ...formValues, [name]: value };
    setFormValues(data);
  };

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        register({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          password: formValues.password,
        }),
      ).unwrap();
      toast(
        AppUtils.successToastMessage({
          title: "Registration success",
          description: "Login using the credentials",
        }),
      );
      navigate(RouteConstants.LOGIN, { replace: true });
    } catch (error) {
      toast(
        AppUtils.errorToastMessage({
          title: "Registration failed",
          description: error.message,
        }),
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Util.io | Register</title>
      </Helmet>
      <Box
        style={{ margin: "auto" }}
        width={{
          xs: "95%",
          sm: "70%",
          md: "50%",
          lg: "40%",
          xl: "40%",
          "2xl": "35%",
        }}
      >
        <Card p={4}>
          <Card.Header title="Register" />
          <Card.Content p={4} textAlign="left">
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  placeholder="Enter your first name"
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value,
                    )
                  }
                />
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  placeholder="Enter your last name"
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value,
                    )
                  }
                />
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value,
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
                      evt.currentTarget.value,
                    )
                  }
                />
              </FormControl>
              <Box textAlign="left" pt={3}>
                <Link as={RouterLink} to={RouteConstants.LOGIN}>
                  Already have an account ?
                </Link>
              </Box>
              <Box mt={7} textAlign="center">
                <Button type="submit" isLoading={loading}>
                  Sign Up
                </Button>
              </Box>
            </form>
          </Card.Content>
        </Card>
      </Box>
    </>
  );
};

export default unsecureComponent(RegisterScreen);
