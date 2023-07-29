import {
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { FaCoins } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

import secureComponent from "../components/SecureComponent";
import RouteConstants from "../constants/RouteConstants";

const ProductsScreen = () => {
  return (
    <>
      <Helmet>
        <title>Util.io | Products</title>
      </Helmet>
      <Flex
        width="full"
        height="full"
        justifyContent={"center"}
        style={{ marginTop: 0 }}
      >
        <Flex
          mt={50}
          height={"50%"}
          width={"50%"}
          bg={useColorModeValue("#FFFFFF", "#141414")}
          border={useColorModeValue("#FFFFFF", "#141414")}
          borderRadius={20}
          borderStyle={"solid"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={"lg"}
          gap={10}
        >
          {[
            <Flex
              key={RouteConstants.WALLET_BASE}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              p={4}
              border={useColorModeValue("#FFFFFF", "#141414")}
              borderRadius={20}
              borderStyle={"solid"}
              boxShadow={"lg"}
              as={RouterLink}
              to={RouteConstants.WALLET_BASE}
            >
              <IconButton
                h={75}
                w={75}
                variant="icon"
                icon={<Icon as={FaCoins} w={10} h={10} color="#00FF00" />}
              />
              <Text mt={1}>Wallet</Text>
            </Flex>,
          ]}
        </Flex>
      </Flex>
    </>
  );
};

export default secureComponent(ProductsScreen);
