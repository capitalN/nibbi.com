import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Select,
  Input,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BorderStyle } from "../styles/global";
import { useState } from "react";

export default function FilterComponent() {
  let navigate = useNavigate();

  const [params, setParams] = useState({});

  const handleFilter = (main, sub) => {
    if (main === "price") {
      navigate(`?min=${sub[0]}&max${sub[2]}`);
    } else if (main === "brand") {
      navigate(`?${main}=${sub}`);
    } else if (main === "sort") {
      navigate(`?${main}=${sub[2]}`);
    } else if (main === "category") {
      navigate(`?${main}=${sub}`);
    }
  };

  return (
    <Box position={"sticky"} top="75px" h="100vh">
      <Stack textAlign="left">
        <Stack position={"relative"}>
          <HStack w="100%" justify={"space-between"}>
            <Heading size={"md"}>FILTERS</Heading>
            <Link to={""}>RESET</Link>
          </HStack>
        </Stack>
        <Accordion defaultIndex={[0]} allowMultiple>
          {filters.map((main) => (
            <AccordionItem key={main.title}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
                  {main.title.toUpperCase()}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                {main.subtitles.map((el) => (
                  <div key={el}>
                    <button onClick={() => handleFilter(main.title, el)}>
                      {el}
                    </button>
                    {/* <Link to={`?${main.title}=${el}`}> {el}</Link> */}
                    <br />
                  </div>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Box>
  );
}

export function FilterDrower() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div>
      <button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <Text
          fontWeight={"bold"}
          color="white"
          w="80px"
          bgColor={"black"}
          p="5px"
        >
          FILTER
        </Text>
      </button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <FilterComponent />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              CLOSE
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export const filters = [
  {
    title: "sort",
    subtitles: [
      ["A to Z", " ", "brand"],
      ["Z to A", " ", "-brand"],
      ["low to high", " ", "price"],
      ["high to low", " ", "-price"],
    ],
  },
  {
    title: "brand",
    subtitles: [
      "almay",
      "anna sui",
      "annabelle",
      "benefit",
      "cargo cosmetics",
      "clinique",
      "covergirl",
      "dior",
      "dr. hauschka",
      "e.l.f.",
      "iman",
      "lotus cosmetics usa",
      "marcelle",
      "marienatie",
      "maybelline",
    ],
  },
  {
    title: "price",
    subtitles: [
      [1, " - ", 10],
      [10, " - ", 20],
      [20, " - ", 30],
      [30, " - ", 40],
    ],
  },
];
