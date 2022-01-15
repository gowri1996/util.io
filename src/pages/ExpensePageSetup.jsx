import { Box, Stack, useMediaQuery } from '@chakra-ui/react';

import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import React from 'react';
import secureComponent from '../components/SecureComponent';

const ExpensePageSetup = ({ title, component }) => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

  let navBarStyleProps = { boxShadow: 'sm' };

  if (isLargerThanMd)
    navBarStyleProps = {
      p: 4,
      position: 'sticky',
      top: '50px',
      overflowY: 'auto',
      width: {
        md: '100px',
        xxl: '250px',
      },
      height: 'full',
    };
  else
    navBarStyleProps = {
      p: 1,
      width: 'full',
      overflowX: 'auto',
      height: 'auto',
    };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Stack
        direction={isLargerThanMd ? 'row' : 'column-reverse'}
        overflowY='hidden'
        style={{ marginTop: 0 }}
        width='full'
        height='full'
      >
        <Navbar styles={{ ...navBarStyleProps }} />
        <Box
          overflowY='auto'
          width={{
            xs: 'full',
            md: 'calc(100% - 100px)',
            lg: 'calc(100% - 100px)',
            xl: 'calc(100% - 100px)',
            xxl: 'calc(100% - 250px)',
          }}
          height={{
            xs: 'calc(100% - 50px)',
            sm: 'calc(100% - 50px)',
            md: '100%',
          }}
        >
          <Box p={2} width='full'>
            {component}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default secureComponent(ExpensePageSetup);
