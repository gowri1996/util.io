import {
  Box,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaChartArea, FaTable } from 'react-icons/fa';

import React from 'react';
import RouteConstants from '../../constants/RouteConstants';
import { Link as RouterLink } from 'react-router-dom';
import { getAllTransactions } from '../../app/slices/transactionSlice';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const navLinks = [
  {
    ROUTE: RouteConstants.WALLET_DASHBOARD,
    TEXT: 'Dashboard',
    IMAGE: <FaChartArea color="#00FF00" />,
    SHOW_TRANSACTIONS_COUNT: false,
  },
  {
    ROUTE: RouteConstants.WALLET_TRANSACTIONS,
    TEXT: 'Transactions',
    IMAGE: <FaTable color="#00FF00" />,
    SHOW_TRANSACTIONS_COUNT: true,
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
          '2xl': 'block',
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
                {nav.SHOW_TRANSACTIONS_COUNT && (
                  <Text float="right">{transactions.length}</Text>
                )}
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
          '2xl': 'none',
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
                <Tooltip label={nav.TEXT} fontSize="xs" placement="right">
                  <IconButton variant={'icon'}>{nav.IMAGE}</IconButton>
                </Tooltip>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;
