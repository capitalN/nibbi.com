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
import { Link } from "react-router-dom";
import HeroOne from "../components/HeroOne";
import HomeCarousel from "../components/HomeCarousel";
import HomeVideo from "../components/HomeVideo";

export default function Home() {
  return (
    <Box>
      <HomeVideo />
      <HomeCarousel />
      <HeroOne />
    </Box>
  );
}
