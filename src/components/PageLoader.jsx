import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

const PageLoader = (props) => {
  return (
    <Flex minHeight='70vh' align='center'>
      <Box textAlign='center'>
        <Spinner thickness={3} speed='0.7s' size='xl' />
        <Text pt={1}>{props.title}</Text>
      </Box>
    </Flex>
  );
};

export default PageLoader;
