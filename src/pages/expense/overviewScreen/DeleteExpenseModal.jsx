import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import React from "react";

const DeleteExpenseModal = (props) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
      isOpen={props.visible}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Expense</ModalHeader>
        <ModalCloseButton isDisabled={props.loading} />
        <ModalBody>
          <Box textAlign="left">
            <Text>Do you want to delete the expense?</Text>
          </Box>
        </ModalBody>
        <ModalFooter alignSelf="right" mb={2}>
          <Box>
            <Button
              variant="danger"
              mr={5}
              onClick={props.onClose}
              isDisabled={props.loading}
            >
              Close
            </Button>
            <Button
              type="submit"
              isLoading={props.loading}
              onClick={props.deleteExpense}
            >
              Delete
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteExpenseModal;
