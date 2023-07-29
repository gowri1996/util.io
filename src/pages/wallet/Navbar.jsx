import {
  Box,
  IconButton,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaChartArea, FaTable } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import RouteConstants from "../../constants/RouteConstants";

const navLinks = [
  {
    ROUTE: RouteConstants.WALLET_DASHBOARD,
    TEXT: "Dashboard",
    IMAGE: <FaChartArea color="#00FF00" />,
    SHOW_TRANSACTIONS_COUNT: false,
  },
  {
    ROUTE: RouteConstants.WALLET_TRANSACTIONS,
    TEXT: "Transactions",
    IMAGE: <FaTable color="#00FF00" />,
    SHOW_TRANSACTIONS_COUNT: true,
  },
];

const Navbar = ({ styles }) => {
  const location = useLocation();
  const bgColor = useColorModeValue("#FCFCFC", "#181818");
  const selectedPathBgColor = useColorModeValue("#EDEEEF", "#080808");

  return (
    <Box as="nav" bg={bgColor} {...styles}>
      <Box>
        <Stack direction="column" alignItems="flex-start" spacing="25">
          {navLinks.map((nav) => {
            return (
              <Box
                p={2}
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
                <Box
                  alignItems={"center"}
                  display={{ xs: "none", "2xl": "flex" }}
                >
                  <Text>{nav.TEXT}</Text>
                  <Spacer />
                  <IconButton variant={"icon"}>{nav.IMAGE}</IconButton>
                </Box>
                <Box
                  alignItems={"center"}
                  display={{ xs: "flex", "2xl": "none" }}
                >
                  <Tooltip label={nav.TEXT} fontSize="xs" placement="right">
                    <IconButton variant={"icon"}>{nav.IMAGE}</IconButton>
                  </Tooltip>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;
