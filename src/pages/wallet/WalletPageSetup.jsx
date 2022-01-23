import { Box, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {
  fetchTransactions,
  isTransactionFetched,
} from '../../app/slices/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import secureComponent from '../../components/SecureComponent';

const WalletPageSetup = ({ title, component }) => {
  const transactionFetched = useSelector(isTransactionFetched);
  const dispatch = useDispatch();

  const navBarStyleProps = {
    boxShadow: 'md',
    p: 4,
    position: 'sticky',
    top: '50px',
    overflowY: 'auto',
    width: {
      xs: '100px',
      xxl: '250px',
    },
    height: 'full',
  };

  useEffect(() => {
    const promise = dispatch(fetchTransactions());

    return () => {
      promise.abort();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Stack
        direction={'row'}
        overflowY='hidden'
        style={{ marginTop: 0 }}
        width='full'
        height='calc(100% - 50px)'
      >
        <Navbar styles={{ ...navBarStyleProps }} />
        <Box
          overflowY='auto'
          style={{ margin: '0px' }}
          width={{
            xs: 'calc(100% - 100px)',
            xxl: 'calc(100% - 250px)',
          }}
          height='full'
        >
          {transactionFetched ? (
            <Box width='full' p={4}>
              {component}
            </Box>
          ) : (
            <Box textAlign='center' mt={50}>
              <Spinner thickness={3} speed='0.8s' size='xl' />
              <Text pt={1}>{'Fetching ...'}</Text>
            </Box>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default secureComponent(WalletPageSetup);
