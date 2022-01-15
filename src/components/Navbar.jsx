import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import AppUtils from '../utils/AppUtils';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = (props) => {
  const location = useLocation();
  const bgColor = useColorModeValue('#FCFCFC', '#181818');
  const selectedPathBgColor = useColorModeValue('#EDEEEF', '#080808');
  const user = useSelector((state) => state.user);

  return (
    <Box as='nav' bg={bgColor} {...props.styles}>
      <Box
        display={{
          xs: 'none',
          sm: 'none',
          md: 'none',
          lg: 'none',
          xl: 'none',
          xxl: 'block',
        }}
      >
        <Stack direction='column' alignItems='flex-start' spacing='25'>
          {AppUtils.getNavLinks().map((nav) => {
            return (
              <Box
                py={2}
                px={2}
                width='full'
                borderRadius={5}
                key={nav.ROUTE}
                as={RouterLink}
                to={nav.ROUTE}
                bg={
                  nav.ROUTE === location.pathname
                    ? selectedPathBgColor
                    : undefined
                }
              >
                <Text float='left'>{nav.TEXT}</Text>
                <Text float='right'>{user.expenses.length}</Text>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Box
        display={{
          xs: 'none',
          sm: 'none',
          md: 'block',
          lg: 'block',
          xl: 'block',
          xxl: 'none',
        }}
      >
        {/* TODO Images for nav bar links */}
        <Stack direction='column' alignItems='flex-start' spacing='25'>
          {AppUtils.getNavLinks().map((nav) => {
            return (
              <Box
                py={2}
                px={2}
                width='full'
                borderRadius={5}
                key={nav.ROUTE}
                as={RouterLink}
                to={nav.ROUTE}
                bg={
                  nav.ROUTE === location.pathname
                    ? selectedPathBgColor
                    : undefined
                }
              >
                <Text float='left'>{nav.SHORT_TEXT}</Text>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Box
        display={{
          xs: 'block',
          sm: 'block',
          md: 'none',
          lg: 'none',
          xl: 'none',
          xxl: 'none',
        }}
      >
        {/* TODO Images for nav bar links */}
        <Stack direction='row' alignItems='flex-start' spacing='10'>
          {AppUtils.getNavLinks().map((nav) => {
            return (
              <Box
                py={1}
                width='full'
                borderRadius={5}
                key={nav.ROUTE}
                as={RouterLink}
                to={nav.ROUTE}
                bg={
                  nav.ROUTE === location.pathname
                    ? selectedPathBgColor
                    : undefined
                }
              >
                <Text textAlign='center'>{nav.SHORT_TEXT}</Text>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;
