import { Box, Flex, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';

import React from 'react';

const CardProperty = ({
  label,
  value,
  useTooltip,
  valueColor,
  custom,
  ...flexProps
}) => {
  return (
    <Flex
      as="dl"
      direction={{ base: 'column', sm: 'row' }}
      py="4"
      _even={{ bg: useColorModeValue('#FBFCFC', '#18272D') }}
      {...flexProps}
    >
      <Box as="dt" ml="10px" width="250px">
        {label}
      </Box>
      <Box as="dd" flex="1" fontWeight="semibold" mr="10px">
        {custom ? (
          <>{custom}</>
        ) : useTooltip ? (
          <Tooltip label={value} fontSize="xs" placement="top">
            <Text fontSize={'md'} color={valueColor}>
              {value}
            </Text>
          </Tooltip>
        ) : (
          <Text fontSize={'md'} color={valueColor}>
            {value}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default CardProperty;
