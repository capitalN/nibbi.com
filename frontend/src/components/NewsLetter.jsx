import React from "react";
import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ButtonStyle } from "../styles/global";

export default function NewsLetter() {
  return (
    <Center>
      <Stack gap="20px">
        <Text fontWeight={"bold"}>JOIN OUR NEWSLETTER</Text>
        <Input type={"email"} />
        <Button {...ButtonStyle}>SUBSCRIBE</Button>
        <br />
        <Text fontWeight={"bold"}>FOLLOW US ON</Text>
        <HStack justify={"space-between"}>
          <Link to="#">INSTAGRAM</Link>
          <Link to="#">FACEBOOK</Link>
          <Link to="#">TWITTER</Link>
        </HStack>
      </Stack>
    </Center>
  );
}
