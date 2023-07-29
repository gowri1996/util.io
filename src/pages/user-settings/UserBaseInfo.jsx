import { Avatar, Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { getUser } from "../../app/slices/userSlice";
import Card from "../../components/card/Card";

const UserBaseInfo = () => {
  const user = useSelector(getUser);

  return (
    <Card p={4} width="full">
      <Card.Content p={2} textAlign="left" width="full" height="full">
        <Flex height={"full"} width={"full"}>
          <Box bg="" width={"70%"}>
            <Box width={"100%"}>
              <Text fontWeight={500} fontSize={"3xl"}>
                {`${user.firstName} ${user.lastName}`}
              </Text>
              <Text fontSize={"lg"} color="gray.500" mt={1}>
                {user.email}
              </Text>
              <Text fontSize={"lg"} color="gray.500" mt={3}>
                {`Joined Util.io on ${new Date(
                  user.createdAt,
                ).toLocaleDateString()}`}
              </Text>
            </Box>
          </Box>
          <Flex width={"30%"} justifyContent={"center"} alignItems={"center"}>
            <Avatar
              size={useBreakpointValue({
                xs: "md",
                md: "lg",
                xl: "2xl",
              })}
              name={`${user.firstName} ${user.lastName}`}
              src=""
            />
          </Flex>
        </Flex>
      </Card.Content>
    </Card>
  );
};

export default UserBaseInfo;
