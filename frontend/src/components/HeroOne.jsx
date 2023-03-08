import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function HeroOne() {
  return (
    <>
      <Box
        h="100vh"
        w={"full"}
        backgroundImage={
          "https://expertphotography.b-cdn.net/wp-content/uploads/2019/02/types-of-portrait-photography-cosmetic-masks.jpeg"
        }
        backgroundSize="cover"
        backgroundRepeat={"no-repeat"}
        backgroundPosition="center"
      >
        <Center w="100%" h="100%" color={"white"}>
          <Stack minW="300px" gap="20px" p="20px">
            <Heading textAlign={"center"} fontFamily="inherit">
              JOIN US NOW
            </Heading>
            <Text fontSize={"20px"}>
              We’re not a store. We are your beauty & personal care assistant.
            </Text>
            <Button
              borderRadius={"0"}
              colorScheme={"red"}
              fontWeight="bold"
              as={Link}
              to="/register"
            >
              JOIN NOW FOR FREE
            </Button>
          </Stack>
        </Center>
      </Box>
    </>
  );
}
