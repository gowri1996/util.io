import { Box, Center, HStack, Spacer, Text } from '@chakra-ui/react';

import Card from '../components/card/Card';
import { Helmet } from 'react-helmet';

const NotFoundScreen = () => {
  return (
    <>
      <Helmet>
        <title>Util.io | Error</title>
      </Helmet>
      <Box style={{ marginTop: '25vh' }} width={500} maxWidth={500}>
        <Card p={10}>
          <Card.Content>
            <Center>
              <HStack>
                <Text>404</Text>
                <Spacer />
                <Text>|</Text>
                <Spacer />
                <Text>This page could not be found</Text>
              </HStack>
            </Center>
          </Card.Content>
        </Card>
      </Box>
    </>
  );
};

export default NotFoundScreen;
