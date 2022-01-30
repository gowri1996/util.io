import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { FaHourglassEnd, FaMapSigns, FaMoon, FaSun } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../app/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppUtils from '../utils/AppUtils';
import RouteConstants from '../constants/RouteConstants';
import { deleteToken } from '../utils/AuthUtils';
import isEmpty from 'lodash.isempty';

const Header = () => {
  const { toggleColorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    try {
      setLoading(true);
      await dispatch(logout()).unwrap();
      setLoading(false);
      deleteToken();
      navigate(RouteConstants.BASE, { replace: true });
    } catch (error) {
      toast(
        AppUtils.errorToastMessage({
          title: 'User could not be logged out',
          description: error.message,
        })
      );
      setLoading(false);
    }
  };

  return (
    <Box
      as="header"
      height="50px"
      width="full"
      position="sticky"
      backgroundColor={useColorModeValue('#021117', '#0E1E25')}
      top={0}
      zIndex={1}
      boxShadow={'md'}
    >
      <Flex>
        <Box>
          <IconButton
            mt={1}
            ml={2}
            size="md"
            variant="icon"
            aria-label="home-icon"
            as={RouterLink}
            to={RouteConstants.BASE}
            icon={<FaHourglassEnd color="#00FF00" />}
          />
        </Box>
        <Spacer />
        <Box>
          <Tooltip
            label="Toggle light/dark theme"
            fontSize="xs"
            placement="left"
          >
            <IconButton
              mt={1}
              mr={2}
              size="md"
              variant="icon"
              aria-label="theme-icon"
              icon={useColorModeValue(
                <FaSun color="#FFA500" />,
                <FaMoon color="#808080" />
              )}
              onClick={() => {
                toggleColorMode();
              }}
            />
          </Tooltip>
          {!isEmpty(user._id) && (
            <Menu>
              <Tooltip label="Actions" fontSize="xs" placement="left">
                <MenuButton
                  mt={2}
                  size="md"
                  variant="header-menu-icon"
                  as={Button}
                  aria-label="actions"
                  isLoading={loading}
                >
                  <Icon as={FaMapSigns} />
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
