import {
  Box,
  Button,
  Input,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import isEmpty from 'lodash.isempty';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../app/slices/userSlice';
import Card from '../../components/card/Card';
import AppUtils from '../../utils/AppUtils';

const AdditionalUserInformationSettings = (props) => {
  const user = useSelector(getUser);
  const toast = useToast();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    currency: user.currency,
  });

  const inputBf = useColorModeValue('#FFFFFF', '#0E1E25');

  useEffect(() => {
    setFormValues({
      currency: user.currency,
    });
  }, [user]);

  const updateUserSettings = async () => {
    if (isEmpty(formValues.currency)) {
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
      <Card.Header title="Additional Information" />
      <Card.Content p={4}>
        <Card.Property
          label="Currency"
          value={user.currency}
          custom={
            editMode ? (
              <Input
                defaultValue={user.currency}
                placeholder="Currency"
                bg={inputBf}
                onChange={(evt) => {
                  const value = evt.target.value;
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    currency: value,
                  }));
                }}
              />
            ) : null
          }
        />
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

export default AdditionalUserInformationSettings;
