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

const DeleteTransactionModal = (props) => {
  const { visible, loading, onClose, deleteTransaction } = props;

  return (
    <Modal
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
      isOpen={visible}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Transaction</ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <Box textAlign="left">
            <Text>Do you want to delete the transaction?</Text>
          </Box>
        </ModalBody>
        <ModalFooter alignSelf="right" mb={2}>
          <Box>
            <Button
              variant="danger"
              mr={5}
              onClick={onClose}
              isDisabled={loading}
            >
              Close
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              onClick={deleteTransaction}
            >
              Delete
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTransactionModal;
