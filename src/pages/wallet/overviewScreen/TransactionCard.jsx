import { FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import React, { memo } from 'react';

import Card from '../../../components/card/Card';

const TransactionCard = (props) => {
  const { data, width, onUpdateTransactionClick, onDeleteTransactionClick } =
    props;

  const createdAt =
    new Date(data.createdAt).toLocaleDateString() +
    ' ' +
    new Date(data.createdAt).toLocaleTimeString();

  const updatedAt =
    new Date(data.updatedAt).toLocaleDateString() +
    ' ' +
    new Date(data.updatedAt).toLocaleTimeString();

  return (
    <Card py={1.5} px={4} borderRadius={10} width={width}>
      <Card.Content mt={1}>
        <Card.Property label="Name" value={data.name} useTooltip={true} />
        <Card.Property label="Category" value={data.category} />
        <Card.Property
          label="Amount"
          value={`${props.currency} ${data.amount}`}
          valueColor={useColorModeValue(
            data.type === 'gain' ? 'green' : '#DE3737',
            data.type === 'gain' ? 'green' : '#E84F4F'
          )}
        />
        <Card.Property
          label="Description"
          value={data.description}
          useTooltip={true}
        />
        <Card.Property label="Created At" value={createdAt} />
        <Card.Property label="Updated At" value={updatedAt} />
      </Card.Content>
      <Card.Footer
        actions={[
          <Tooltip label="Edit Transaction" fontSize="xs" placement="top">
            <IconButton
              aria-label="update-icon"
              icon={<FaEdit />}
              size="md"
              onClick={() => {
                onUpdateTransactionClick(data);
              }}
            />
          </Tooltip>,
          <Tooltip label="Delete Transaction" fontSize="xs" placement="top">
            <IconButton
              variant="danger"
              aria-label="delete-icon"
              icon={<FaRegWindowClose />}
              size="md"
              onClick={() => {
                onDeleteTransactionClick(data);
              }}
            />
          </Tooltip>,
        ]}
      />
    </Card>
  );
};

export default memo(TransactionCard);
