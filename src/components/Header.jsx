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
import { FaHamburger, FaInfo, FaMoon, FaSun } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AppUtils from '../utils/AppUtils';
import RouteConstants from '../constants/RouteConstants';
import ThemeConstants from '../constants/ThemeConstants';
import { deleteToken } from '../utils/AuthUtils';
import isEmpty from 'lodash.isempty';
import { logout } from '../app/slices/userSlice';

const Header = () => {
  const { toggleColorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    try {
      setLoading(true);
      await dispatch(logout()).unwrap();
      setLoading(false);
      deleteToken();
      navigate(RouteConstants.LOGIN, { replace: true });
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
      as='header'
      height='50px'
      width='full'
      position='sticky'
      boxShadow='sm'
      backgroundColor={useColorModeValue(
        ThemeConstants.LIGHT_THEME_PRIMARY_COLOR,
        ThemeConstants.DARK_THEME_PRIMARY_COLOR
      )}
      top={0}
      zIndex={1}
    >
      <Flex>
        <Box>
          <IconButton
            aria-label='homeIcon'
            as={RouterLink}
            to={RouteConstants.LOGIN}
            icon={<FaInfo />}
            mt={1}
            mr={2}
            size='md'
          />
        </Box>
        <Spacer />
        <Box>
          <Tooltip
            label='Toggle light/dark theme'
            fontSize='xs'
            placement='left'
          >
            <IconButton
              aria-label='themeIcon'
              icon={useColorModeValue(<FaSun />, <FaMoon />)}
              mt={1}
              mr={2}
              size='md'
              onClick={() => {
                toggleColorMode();
              }}
            />
          </Tooltip>
          {!isEmpty(user._id) && (
            <Menu>
              <Tooltip label='Actions' fontSize='xs' placement='left'>
                <MenuButton
                  as={Button}
                  aria-label='actions'
                  size='md'
                  isLoading={loading}
                >
                  <Icon as={FaHamburger} />
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
