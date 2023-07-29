import { Box, SimpleGrid } from "@chakra-ui/react";

import AdditionalUserInformationSettings from "./AdditionalUserInformationSettings";
import UserBaseInfo from "./UserBaseInfo";
import UserPersonalSettings from "./UserPersonalSettings";
import secureComponent from "../../components/SecureComponent";

const UserSettings = () => {
  return (
    <Box alignSelf={"start"} p={"50px"} height={"auto"} width={"full"}>
      <SimpleGrid width={{ xs: "100%", lg: "50%" }}>
        <UserBaseInfo />
      </SimpleGrid>
      <SimpleGrid mt={"25px"} columns={{ xs: 1, lg: 2 }} gap={4}>
        <Box w="100%">{<UserPersonalSettings />}</Box>
        <Box w="100%">{<AdditionalUserInformationSettings />}</Box>
      </SimpleGrid>
    </Box>
  );
};

export default secureComponent(UserSettings);
