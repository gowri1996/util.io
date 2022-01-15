import { Box } from '@chakra-ui/react';
import CardContent from './CardContent';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CardProperty from './CardProperty';
import { useColorModeValue } from '@chakra-ui/react';

const Card = ({ children, ...rest }) => {
  return (
    <Box
      boxShadow='md'
      borderWidth={1}
      borderRadius={30}
      bg={useColorModeValue('#FCFCFC', '#181818')}
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
