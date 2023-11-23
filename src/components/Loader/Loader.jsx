import { Box, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <VStack h="90vh" justifyContent={"center"}>
      <Box transform={"scale(3)"}>
        <Spinner
          size="xl" // Adjust the size to "xl" or any other size you prefer
          thickness="4px" // Adjust the thickness of the spinner
          speed="0.65s" // Adjust the animation speed
          color="teal.500" // Change the color to match your design
        />
      </Box>
    </VStack>
  );
};

export default Loader;
