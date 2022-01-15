import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const CreateUpdateExpenseModal = (props) => {
  const [expenseValues, setExpenseValues] = useState({
    name: "",
    expense: 0,
    category: "",
    description: "",
  });

  useEffect(() => {
    if (props.visible) {
      if (props.expense) {
        setExpenseValues({
          name: props.expense.name,
          expense: props.expense.expense,
          category: props.expense.category,
          description: props.expense.description,
        });
      } else {
        props.categories.length > 0 &&
          handleFormInputChange("category", props.categories[0]._id);
      }
    } else {
      setExpenseValues({
        name: "",
        expense: 0,
        category: "",
        description: "",
      });
    }
  }, [props.visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormInputChange = (name, value) => {
    const data = { ...expenseValues, [name]: value };
    setExpenseValues(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(expenseValues);
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
      isOpen={props.visible}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {props.expense ? "Update Expense" : "Create Expense"}
        </ModalHeader>
        <ModalCloseButton isDisabled={props.loading} />
        <ModalBody>
          <Box p={4} textAlign="left">
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={expenseValues.name}
                  placeholder="Expense name"
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    )
                  }
                />
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>Expense Amount</FormLabel>
                <NumberInput
                  min={0}
                  value={expenseValues.expense}
                  placeholder="Expense amount"
                  onChange={(value) => {
                    handleFormInputChange("expense", Number(value));
                  }}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  value={expenseValues.category}
                  onChange={(evt) => {
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    );
                  }}
                >
                  {props.categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Description for your expense"
                  value={expenseValues.description}
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    )
                  }
                />
              </FormControl>
              <Box mt={7} textAlign="center">
                <Button
                  variant="danger"
                  mr={5}
                  onClick={props.onClose}
                  isDisabled={props.loading}
                >
                  Close
                </Button>
                <Button type="submit" isLoading={props.loading}>
                  {props.expense ? "Update" : "Create"}
                </Button>
              </Box>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateUpdateExpenseModal;
