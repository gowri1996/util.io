import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import React from 'react';
import RouteConstants from '../../constants/RouteConstants';
import { Link as RouterLink } from 'react-router-dom';
import { getAllTransactions } from '../../app/slices/transactionSlice';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const navLinks = [
  {
    ROUTE: RouteConstants.WALLET_OVERVIEW,
    TEXT: 'Overview',
    SHORT_TEXT: 'O',
  },
  {
    ROUTE: RouteConstants.WALLET_ANALYTICS,
    TEXT: 'Analytics',
    SHORT_TEXT: 'A',
  },
];

const Navbar = ({ styles }) => {
  const location = useLocation();
  const bgColor = useColorModeValue('#FCFCFC', '#181818');
  const selectedPathBgColor = useColorModeValue('#EDEEEF', '#080808');
  const transactions = useSelector(getAllTransactions);

  return (
    <Box as="nav" bg={bgColor} {...styles}>
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
        <Stack direction="column" alignItems="flex-start" spacing="25">
          {navLinks.map((nav) => {
            return (
              <Box
                py={2}
                px={2}
                width="full"
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
                <Text float="left">{nav.TEXT}</Text>
                <Text float="right">{transactions.length}</Text>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Box
        display={{
          xs: 'block',
          sm: 'block',
          md: 'block',
          lg: 'block',
          xl: 'block',
          xxl: 'none',
        }}
      >
        {/* TODO Images for nav bar links */}
        <Stack direction="column" alignItems="flex-start" spacing="25">
          {navLinks.map((nav) => {
            return (
              <Box
                py={2}
                px={2}
                width="full"
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
                <Text float="left">{nav.SHORT_TEXT}</Text>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;
