import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function HomeVideo() {
  return (
    <Box w="100%" h="100vh" position={"relative"}>
      <video
        autoplay
        muted
        loop
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100vh",
        }}
      >
        <source src="nibbi.mp4" type="video/mp4" />
      </video>
      <Box
        position={"absolute"}
        color="white"
        top="50%"
        textAlign={"center"}
        w="100%"
      >
        <Heading fontSize={"10rem"} fontFamily={"cursive"}>
          nibbi
        </Heading>
        <Heading fontFamily={"inherit"}>www.nibbi.com</Heading>
      </Box>
    </Box>
  );
}
