import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CreateUpdateTransactionModal = (props) => {
  const { data, visible, loading, handleSubmit, onClose } = props;

  const [transaction, setTransaction] = useState({
    name: "",
    type: "gain",
    amount: 0,
    category: "",
    description: "",
  });

  useEffect(() => {
    if (visible) {
      if (data) {
        setTransaction({
          name: data.name,
          type: data.type,
          amount: data.amount,
          category: data.category,
          description: data.description,
        });
      }
    } else {
      setTransaction({
        name: "",
        type: "gain",
        amount: 0,
        category: "",
        description: "",
      });
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormInputChange = (name, value) => {
    setTransaction({ ...transaction, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(transaction);
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
      isOpen={visible}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {data ? "Edit Transaction" : "Add Transaction"}
        </ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <Box p={4} textAlign="left">
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={transaction.name}
                  placeholder="Transaction name"
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value,
                    )
                  }
                />
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <Stack direction="row">
                  <Select
                    name="type"
                    width="150px"
                    value={transaction.type}
                    onChange={(evt) => {
                      handleFormInputChange(
                        evt.currentTarget.name,
                        evt.currentTarget.value,
                      );
                    }}
                  >
                    <option key={"gain"} value={"gain"}>
                      Gain
                    </option>
                    <option key={"loss"} value={"loss"}>
                      Loss
                    </option>
                  </Select>
                  <NumberInput
                    id="amount"
                    min={0}
                    step={10}
                    value={transaction.amount}
                    placeholder="Amount"
                    color={useColorModeValue(
                      transaction.type === "gain" ? "green" : "#DE3737",
                      transaction.type === "gain" ? "green" : "#E84F4F",
                    )}
                    onChange={(value) => {
                      handleFormInputChange("amount", Number(value));
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Stack>
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Box
                  border={useColorModeValue(
                    "#E2E8F0",
                    "rgba(255, 255, 255, 0.16)",
                  )}
                  borderWidth={1}
                  borderRadius={10}
                  borderStyle={"solid"}
                  padding={4}
                >
                  <Input
                    id="category"
                    name="category"
                    value={transaction.category}
                    placeholder="Transaction Category"
                    onChange={(evt) =>
                      handleFormInputChange(
                        evt.currentTarget.name,
                        evt.currentTarget.value,
                      )
                    }
                  />
                  <FormHelperText>
                    Eg: Swiggy, Amazon, Mobile, etc..
                  </FormHelperText>
                </Box>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Description for your transaction"
                  value={transaction.description}
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value,
                    )
                  }
                />
              </FormControl>
              <Box mt={7} textAlign="center">
                <Button
                  variant="danger"
                  mr={5}
                  onClick={onClose}
                  isDisabled={loading}
                >
                  Close
                </Button>
                <Button type="submit" isLoading={loading}>
                  {data ? "Edit" : "Add"}
                </Button>
              </Box>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateUpdateTransactionModal;
