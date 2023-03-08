import React from "react";
import {
  Box,
  Center,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NewsLetter from "./NewsLetter";

export default function Footer() {
  return (
    <Center w="100%" minH="100vh" zIndex={2000} as={"footer"} bgColor="white">
      <Grid
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(4,1fr)",
          xl: "repeat(4,1fr)",
        }}
        gap="30px"
      >
        <Stack>
          <Heading fontFamily={"cursive"} size="2xl">nibbi</Heading>
          <Text>www.nibbi.com</Text>
        </Stack>
        {LINKS.map((el) => (
          <Stack key={el} w="200px">
            <LinkComp el={el} />
          </Stack>
        ))}
        <NewsLetter />
      </Grid>
    </Center>
  );
}

export const LinkComp = ({ el }) => {
  return (
    <>
      {el.map((link) => (
        <Link to="#" key={link}>
          {link}
        </Link>
      ))}
    </>
  );
};

export const LINKS = [
  [
    "About us",
    "Shop the Look",
    "Blogs",
    "Contact us",
    "Terms of Service",
    "Refund policy",
  ],
  [
    "Terms of Service",
    "Privacy Policy",
    "Shipping & Returns",
    "Cancellation policy",
    "Refund policy",
  ],
];
