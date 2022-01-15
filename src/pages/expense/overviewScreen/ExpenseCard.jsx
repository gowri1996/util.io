import { FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { IconButton, Tooltip } from '@chakra-ui/react';
import React, { memo } from 'react';

import Card from '../../../components/card/Card';

const ExpenseCard = (props) => {
  const createdAt =
    new Date(props.data.createdAt).toLocaleDateString() +
    ' ' +
    new Date(props.data.createdAt).toLocaleTimeString();

  const updatedAt =
    new Date(props.data.updatedAt).toLocaleDateString() +
    ' ' +
    new Date(props.data.updatedAt).toLocaleTimeString();

  return (
    <Card py={1.5} px={4} borderRadius={10} width={props.width}>
      <Card.Content mt={1}>
        <Card.Property label='Name' value={props.data.name} useTooltip={true} />
        <Card.Property label='Category' value={props.data.category} />
        <Card.Property label='Amount' value={props.data.expense} />
        <Card.Property
          label='Description'
          value={props.data.description}
          useTooltip={true}
        />
        <Card.Property label='Created At' value={createdAt} />
        <Card.Property label='Updated At' value={updatedAt} />
      </Card.Content>
      <Card.Footer
        actions={[
          <Tooltip label='Update Expense' fontSize='xs' placement='top'>
            <IconButton
              aria-label='updateIcon'
              icon={<FaEdit />}
              size='md'
              onClick={() => {
                props.onUpdateExpenseClick(props.data);
              }}
            />
          </Tooltip>,
          <Tooltip label='Delete Expense' fontSize='xs' placement='top'>
            <IconButton
              variant='danger'
              aria-label='deleteIcon'
              icon={<FaRegWindowClose />}
              size='md'
              onClick={() => {
                props.onDeleteExpenseClick(props.data);
              }}
            />
          </Tooltip>,
        ]}
      />
    </Card>
  );
};

export default memo(ExpenseCard);
