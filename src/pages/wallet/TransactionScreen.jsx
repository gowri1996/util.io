import {
  Box,
  Center,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  chakra,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { FaEdit, FaPlus, FaRegWindowClose } from 'react-icons/fa';
import React, { useState } from 'react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from '../../app/slices/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSortBy, useTable } from 'react-table';

import AppUtils from '../../utils/AppUtils';
import Card from '../../components/card/Card';
import CreateUpdateTransactionModal from './transactionScreen/CreateUpdateTransactionModal';
import DeleteTransactionModal from './transactionScreen/DeleteTransactionModal';
import { getUser } from '../../app/slices/userSlice';

const TransactionScreen = (props) => {
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

  const setupUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setAction('edit');
  };

  const setupDelete = (transaction) => {
    setSelectedTransaction(transaction);
    setAction('delete');
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Amount',
        accessor: (row) => {
          return `${user.currency ? user.currency : ''} ${row.amount}`;
        },
        Cell: (data) => {
          const row = data.row.original;
          const color = row.type === 'gain' ? 'green' : 'red';
          return <Text color={color}>{data.value}</Text>;
        },
        id: 'amountFormatted',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: (data) => {
          const row = data.row.original;
          const createdAt =
            new Date(row.createdAt).toLocaleDateString() +
            ' ' +
            new Date(row.createdAt).toLocaleTimeString();
          return <Text>{createdAt}</Text>;
        },
      },
      {
        Header: 'Updated At',
        accessor: 'updatedAt',
        disableSortBy: true,
        Cell: (data) => {
          const row = data.row.original;
          const updatedAt =
            new Date(row.updatedAt).toLocaleDateString() +
            ' ' +
            new Date(row.updatedAt).toLocaleTimeString();
          return <Text>{updatedAt}</Text>;
        },
      },
      {
        Header: 'Actions',
        Cell: (data) => {
          const row = data.row.original;
          return (
            <Flex>
              <Tooltip label="Edit Transaction" fontSize="xs" placement="top">
                <IconButton
                  aria-label="update-icon"
                  variant="icon"
                  color="green"
                  icon={<FaEdit />}
                  size="md"
                  onClick={() => {
                    setupUpdate(row);
                  }}
                />
              </Tooltip>
              <Tooltip label="Delete Transaction" fontSize="xs" placement="top">
                <IconButton
                  variant="icon"
                  color="red"
                  aria-label="delete-icon"
                  icon={<FaRegWindowClose />}
                  size="md"
                  onClick={() => {
                    setupDelete(row);
                  }}
                />
              </Tooltip>
            </Flex>
          );
        },
      },
    ],
    [user]
  );

  const tableBorderColor = useColorModeValue('#FFFFFF', '#000000');
  const tableColor = useColorModeValue('#FFFFFF', '#141414');

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: transactions }, useSortBy);

  return (
    <Box>
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
      {transactions.length > 0 ? (
        <Box
          p={3}
          mt={5}
          border={'solid'}
          borderRadius={8}
          borderWidth={1}
          borderColor={tableBorderColor}
          zIndex={1}
          boxShadow={'sm'}
          display="block"
          maxW={'full'}
          overflowX={'auto'}
          overflowY={'auto'}
          bg={tableColor}
        >
          <Table
            {...getTableProps()}
            size="sm"
            variant={'unstyled'}
            width={'full'}
          >
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()} m={4}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      isNumeric={column.isNumeric}
                    >
                      <Flex>
                        {column.render('Header')}
                        <chakra.span ml="4">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <TriangleDownIcon aria-label="sorted descending" />
                            ) : (
                              <TriangleUpIcon aria-label="sorted ascending" />
                            )
                          ) : null}
                        </chakra.span>
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <Td
                        {...cell.getCellProps()}
                        isNumeric={cell.column.isNumeric}
                      >
                        {cell.render('Cell')}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
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

export default TransactionScreen;
