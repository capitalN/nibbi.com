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
  CloseButton,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BorderStyle } from "../styles/global";
import { useState } from "react";
import { useEffect } from "react";
import { get_products } from "../redux/products/actions";
import { useSearchParams } from "react-router-dom";
import { AiOutlineFilter } from "react-icons/ai";

export default function FilterComponent({onClose}) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  // const { search } = useLocation();
  let params = new URLSearchParams(searchParams);
  let entries = params.entries();
  let obj = Object.fromEntries(entries);

  const handleFilter = async (main, sub) => {
    if (main === "price") {
      // dispatch(get_products({ ...params, min: sub[0], max: sub[2] }));
      setSearchParams({ ...obj, min: sub[0], max: sub[2] });
    } else if (main === "brand") {
      // dispatch(get_products({ ...params, brand: sub }));
      setSearchParams({ ...obj, brand: sub });
    } else if (main === "sort") {
      // dispatch(get_products({ ...params, sort: sub }));
      setSearchParams({ ...obj, sort: sub[2] });
    } else if (main === "type") {
      // dispatch(get_products({ ...params, product_type: sub }));
      setSearchParams({ ...obj, product_type: sub });
    }
  };

  return (
    <Box position={"sticky"} top="85px" >
      <Stack textAlign="left">
        <Stack position={"relative"}>
          <HStack w="100%" justify={"space-between"}>
            <Heading size={"md"} fontFamily="inherit">
              FILTERS
            </Heading>
            {params?.sort && <Box border={"1px solid"}>{params.sort}</Box>}
            <button onClick={() => setSearchParams({})}>RESET</button>
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
          // color="white"
          w="80px"
          bgColor={"white"}
          border="1px solid"
          p="5px"
          m="10px"
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
            <FilterComponent onClose={onClose} />
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
