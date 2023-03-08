import React from "react";
import { Box } from "@chakra-ui/react";

export default function HomeVideo() {
  return (
    <Box w="100%" h="100vh">
      <video
        autoplay={true}
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
    </Box>
  );
}
