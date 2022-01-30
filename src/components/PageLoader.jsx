import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

const PageLoader = ({ title }) => {
  return (
    <Flex minHeight="70vh" align="center">
      <Box textAlign="center">
        <Spinner thickness={3} speed="0.8s" size="xl" />
        <Text pt={1}>{title}</Text>
      </Box>
    </Flex>
  );
};

export default PageLoader;
