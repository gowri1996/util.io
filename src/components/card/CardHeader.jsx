import { Flex, Heading } from '@chakra-ui/react';

import React from 'react';

const CardHeader = ({ title, ...flexProps }) => {
  return (
    <Flex pt={4} pb={4} ml={4} borderBottomWidth="2px" {...flexProps}>
      <Heading fontSize="x-large">{title}</Heading>
    </Flex>
  );
};

export default CardHeader;
