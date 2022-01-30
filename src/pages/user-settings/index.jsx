import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import secureComponent from '../../components/SecureComponent';
import AdditionalUserInformationSettings from './AdditionalUserInformationSettings';
import UserBaseInfo from './UserBaseInfo';
import UserPersonalSettings from './UserPersonalSettings';

const UserSettings = (props) => {
  return (
    <Box alignSelf={'start'} p={'50px'} height={'auto'} width={'full'}>
      <SimpleGrid width={{ xs: '100%', lg: '50%' }}>
        <UserBaseInfo />
      </SimpleGrid>
      <SimpleGrid mt={'50px'} columns={{ xs: 1, lg: 2 }} gap={4}>
        <Box w="100%">{<UserPersonalSettings />}</Box>
        <Box w="100%">{<AdditionalUserInformationSettings />}</Box>
      </SimpleGrid>
    </Box>
  );
};

export default secureComponent(UserSettings);
