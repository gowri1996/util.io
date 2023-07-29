import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import CardContent from "./CardContent";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import CardProperty from "./CardProperty";

const Card = ({ children, ...rest }) => {
  return (
    <Box
      boxShadow="md"
      borderRadius={8}
      bg={useColorModeValue("#FFFFFF", "#0E1E25")}
      {...rest}
    >
      {children}
    </Box>
  );
};

Card.Content = CardContent;
Card.Header = CardHeader;
Card.Property = CardProperty;
Card.Footer = CardFooter;

export default Card;
