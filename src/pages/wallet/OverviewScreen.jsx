import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from '../../app/slices/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppUtils from '../../utils/AppUtils';
import Card from '../../components/card/Card';
import CreateUpdateTransactionModal from './overviewScreen/CreateUpdateTransactionModal';
import DeleteTransactionModal from './overviewScreen/DeleteTransactionModal';
import { FaPlus } from 'react-icons/fa';
import TransactionCard from './overviewScreen/TransactionCard';
import { getUser } from '../../app/slices/userSlice';

const OverviewScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const user = useSelector(getUser);
  const transactions = useSelector(getAllTransactions);

  const toast = useToast();
  const dispatch = useDispatch();

  const onSubmit = (transaction) => {
    if (transaction.amount <= 0) {
      AppUtils.errorToastMessage({
        title: 'Amount value is invalid',
        description: 'Amount must be greater than zero',
      });
      return;
    }

    if (selectedTransaction)
      onUpdateTransaction(selectedTransaction._id, transaction);
    else onCreateTransaction(transaction);
  };

  const onCreateTransaction = async (transaction) => {
    setLoading(true);
    try {
      await dispatch(createTransaction(transaction)).unwrap();
      setSelectedTransaction(null);
      setAction(null);
      toast(
        AppUtils.successToastMessage({
          title: 'Transaction created',
        })
      );
    } catch (error) {
      toast(
        AppUtils.errorToastMessage({
          title: 'Transaction cannot be added',
          description: error.message,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const onUpdateTransaction = async (transactionId, transaction) => {
    setLoading(true);
    try {
      await dispatch(
        updateTransaction({ transactionId, transaction })
      ).unwrap();
      setSelectedTransaction(null);
      setAction(null);
      toast(
        AppUtils.successToastMessage({
          title: 'Transaction updated',
        })
      );
    } catch (error) {
      toast(
        AppUtils.errorToastMessage({
          title: 'Transaction cannot be updated',
          description: error.message,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const onDeleteTransaction = async () => {
    setLoading(true);
    try {
      await dispatch(deleteTransaction(selectedTransaction._id)).unwrap();
      setSelectedTransaction(null);
      setAction(null);
      toast(
        AppUtils.successToastMessage({
          title: 'Transaction deleted',
        })
      );
    } catch (error) {
      toast(
        AppUtils.errorToastMessage({
          title: 'Transaction cannot be deleted',
          description: error.message,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const setupUpdate = useCallback((transaction) => {
    setSelectedTransaction(transaction);
    setAction('edit');
  }, []);

  const setupDelete = useCallback((transaction) => {
    setSelectedTransaction(transaction);
    setAction('delete');
  }, []);

  return (
    <Box>
      <Flex>
        <Box>
          <Heading fontWeight={300} letterSpacing={0.5}>
            Overview
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Tooltip label="Add Transaction" placement="left" fontSize="sm">
            <IconButton
              variant={'icon'}
              size="md"
              icon={<FaPlus />}
              aria-label="add-transaction-icon"
              onClick={() => {
                setAction('add');
              }}
            />
          </Tooltip>
        </Box>
      </Flex>
      {transactions.length > 0 ? (
        <Wrap mt={2} spacing="2">
          {transactions.map((transaction) => (
            <WrapItem
              key={transaction._id}
              width={{
                xs: 'full',
                sm: 'calc(calc((100% / 2)) - 20px)',
                xl: 'calc(calc((100% / 3)) - 20px)',
                '2xl': 'calc(calc((100% / 3)) - 20px)',
              }}
            >
              <TransactionCard
                currency={user.currency ? user.currency : ''}
                data={transaction}
                width="full"
                onUpdateTransactionClick={setupUpdate}
                onDeleteTransactionClick={setupDelete}
              />
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Box
          mt="15vh"
          mx="auto"
          width={{
            xs: '70%',
            sm: '70%',
            md: '50%',
          }}
        >
          <Card p={7}>
            <Card.Content>
              <Center>
                <Text>
                  {`Hey ${user.firstName}, add some transactions `}
                  &#128512;
                </Text>
              </Center>
            </Card.Content>
          </Card>
        </Box>
      )}
      <CreateUpdateTransactionModal
        visible={action === 'add' || action === 'edit'}
        data={selectedTransaction}
        loading={loading}
        handleSubmit={onSubmit}
        onClose={() => {
          setSelectedTransaction(null);
          setAction(null);
        }}
      />
      <DeleteTransactionModal
        visible={action === 'delete'}
        loading={loading}
        deleteTransaction={onDeleteTransaction}
        onClose={() => {
          setSelectedTransaction(null);
          setAction(null);
        }}
      />
    </Box>
  );
};

export default OverviewScreen;
