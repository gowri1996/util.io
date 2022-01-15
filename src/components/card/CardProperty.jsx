import { Box, Divider, Flex, Text, Tooltip } from '@chakra-ui/react';

import React from 'react';

const CardProperty = ({ label, value, useTooltip, ...flexProps }) => {
  return (
    <Box>
      <Flex direction={{ base: 'row' }} px='1' py='2' {...flexProps}>
        <Box minW='100'>
          <Text fontSize='sm'>{label}</Text>
        </Box>
        <Divider orientation='vertical' h='20px' />
        <Box ml={2} width='calc(100% - 102px)'>
          {useTooltip ? (
            <Tooltip label={value} fontSize='xs' placement='top'>
              <Text fontSize='sm' isTruncated>
                {value}
              </Text>
            </Tooltip>
          ) : (
            <Text fontSize='sm' isTruncated>
              {value}
            </Text>
          )}
        </Box>
      </Flex>
      <Divider />
    </Box>
  );
};

export default CardProperty;
