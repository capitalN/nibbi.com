import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function Home() {
  return (
    <>
      <Box
        h="100vh"
        backgroundImage={
          "https://expertphotography.b-cdn.net/wp-content/uploads/2019/02/types-of-portrait-photography-cosmetic-masks.jpeg"
        }
        backgroundSize="cover"
        backgroundRepeat={"no-repeat"}
        backgroundPosition="center"
      >
        <Center w="100%" h="100%" color={"white"}>
          <Stack minW="300px" gap="20px" p="20px">
            <Heading textAlign={"center"}>JOIN US NOW</Heading>
            <Text fontSize={"20px"}>
              We’re not a store. We are your beauty & personal care assistant.
            </Text>
            <Button borderRadius={"0"} colorScheme={"red"} fontWeight="bold">
              JOIN NOW FOR FREE
            </Button>
          </Stack>
        </Center>
      </Box>
      <Text>Hello</Text>
    </>
  );
}
