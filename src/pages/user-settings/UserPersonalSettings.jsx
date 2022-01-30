import {
  Box,
  Button,
  Input,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import isEmpty from 'lodash.isempty';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUser, updateUser } from '../../app/slices/userSlice';
import Card from '../../components/card/Card';
import AppUtils from '../../utils/AppUtils';

const UserPersonalSettings = (props) => {
  const user = useSelector(getUser);
  const toast = useToast();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const inputBf = useColorModeValue('#FFFFFF', '#0E1E25');

  useEffect(() => {
    setFormValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }, [user]);

  const updateUserSettings = async () => {
    if (
      isEmpty(formValues.firstName) ||
      isEmpty(formValues.lastName) ||
      isEmpty(formValues.email)
    ) {
      toast(
        AppUtils.errorToastMessage({
          title: 'Provide all details to save',
        })
      );
    } else {
      setLoading(true);
      try {
        await dispatch(updateUser(formValues)).unwrap();
        toast(
          AppUtils.successToastMessage({
            title: 'User updated successfully',
          })
        );
        setEditMode(false);
      } catch (error) {
        toast(
          AppUtils.errorToastMessage({
            title: 'User could not be updated',
            description: error.message,
          })
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card p={4} width={'full'}>
      <Card.Header title="Personal Information" />
      <Card.Content p={4}>
        <Card.Property
          label="First name"
          value={user.firstName}
          custom={
            editMode ? (
              <Input
                defaultValue={user.firstName}
                placeholder="First name"
                bg={inputBf}
                onChange={(evt) => {
                  const value = evt.target.value;
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    firstName: value,
                  }));
                }}
              />
            ) : null
          }
        />
        <Card.Property
          label="Last name"
          value={user.lastName}
          custom={
            editMode ? (
              <Input
                defaultValue={user.lastName}
                placeholder="Last name"
                bg={inputBf}
                onChange={(evt) => {
                  const value = evt.target.value;
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    lastName: value,
                  }));
                }}
              />
            ) : null
          }
        />
        <Card.Property label="Email" value={user.email} />
        {!editMode ? (
          <Box mt={5} textAlign="left">
            <Button onClick={() => setEditMode(true)}>Edit Settings</Button>
          </Box>
        ) : (
          <Box mt={5} textAlign="left">
            <Button
              variant={'danger'}
              mr={5}
              onClick={() => {
                setEditMode(false);
                setFormValues({
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                });
              }}
            >
              Close
            </Button>
            <Button onClick={updateUserSettings} isLoading={loading}>
              Save
            </Button>
          </Box>
        )}
      </Card.Content>
    </Card>
  );
};

export default UserPersonalSettings;
