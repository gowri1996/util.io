import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import isEmpty from "lodash.isempty";
import React from "react";

const CardFooter = ({ actions, ...rest }) => {
  return !isEmpty(actions) ? (
    <Box>
      <SimpleGrid
        mt="2"
        columns={actions.length}
        spacing={4}
        height="50"
        {...rest}
      >
        {actions.map((ActionComponent, index) => (
          <React.Fragment key={index}>
            <Center>{ActionComponent}</Center>
          </React.Fragment>
        ))}
      </SimpleGrid>
    </Box>
  ) : null;
};

export default CardFooter;
