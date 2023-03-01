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
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FilterComponent() {
  const dispatch = useDispatch();
  const { PRODUCTS } = useSelector((store) => store.productsManager);
  const Router = useParams();
  const params = Router.query;

  const handleFilter = (main, sub) => {
    if (main === "price") {
      Router.query.min = sub[0];
      Router.query.max = sub[2];
      Router.push(Router);
    } else if (main === "brand") {
      Router.query.brand = sub;
      Router.push(Router);
    } else if (main === "sort") {
      Router.query.sort = sub[2];
      Router.push(Router);
    }
  };

  return (
    <Box>
      <Stack p="10px" textAlign="left">
        <Stack p="15px" position={"relative"}>
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
      "milani",
      "mineral fusion",
      "nyx",
      "pacifica",
      "physicians formula",
      "pure anada",
      "revlon",
      "smashbox",
      "suncoat",
      "wet n wild",
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
