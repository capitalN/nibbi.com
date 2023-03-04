import React, { useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Heading,
  HStack,
  Text,
  Button,
  Flex,
  VStack,
  Stack,
  Image,
  Hide,
  Show,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  PopoverArrow,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import SearchDrower from "./SearchDrower";
import Account from "./Account";
import { useSelector } from "react-redux";
import {
  RiShoppingCartLine,
  RiAccountCircleLine,
  RiShoppingBagLine,
} from "react-icons/ri";
import CartDrower from "./CartDrawer";

export default function Navbar() {
  const { query } = useParams();
  const { isAuth } = useSelector((store) => store.authManager);
  return (
    <>
      <HStack
        justify={"space-between"}
        p="5px 20px"
        bgColor={"white"}
        zIndex="1000"
        w="100%"
        h="65px"
        border={"1px solid #D6D6D6"}
        position={"sticky"}
        top="0"
        as={"navbar"}
      >
        <Show below="lg">
          <NavDrawer />
        </Show>

        <Show above="lg">
          <Box w="120px">
            <Heading as={Link} to="/" fontFamily="cursive">
              nibbi
            </Heading>
          </Box>
          <HStack justify={"space-evenly"} gap="20px">
            {LINKS.map((main) => (
              <div key={main.type}>
                <DropDown main={main} />
              </div>
            ))}
          </HStack>
        </Show>

        <Stack
          justify={"space-between"}
          w="120px"
          textAlign={"center"}
          direction="row"
          align={"center"}
        >
          <Stack>
            <SearchDrower />
          </Stack>
          <Stack>
            {isAuth ? (
              <Account />
            ) : (
              <Link to="/login">
                <RiAccountCircleLine size={"26px"} />
              </Link>
            )}
          </Stack>
          <Link to="/cart">
            <RiShoppingBagLine size={"25px"} />
            {/* <CartDrower /> */}
          </Link>
        </Stack>
      </HStack>
    </>
  );
}

const DropDown = ({ main }) => {
  return (
    <>
      <Popover key={main.type}>
        <PopoverTrigger>
          <button
          // to={`/products?product_type=${main.type}`}
          >
            {main.type.toUpperCase()}
          </button>
        </PopoverTrigger>
        <PopoverContent w="auto">
          <PopoverArrow />
          <Stack justify={"space-between"} p="20px" boxShadow={"xl"}>
            <Stack w="120px">
              {main.tag.map((tag) => (
                <Text
                  as={Link}
                  to={`/products?product_type=${main.type}&products_tag=${tag}`}
                  key={tag}
                  _hover={{ fontWeight: "bold" }}
                >
                  {tag}
                </Text>
              ))}
            </Stack>

            <Stack w="120px">
              {main.category.map((category) => (
                <Text
                  as={Link}
                  to={`/products?product_type=${main.type}&category=${category}`}
                  key={category}
                  _hover={{ fontWeight: "bold" }}
                >
                  {category}
                </Text>
              ))}
            </Stack>
          </Stack>
        </PopoverContent>
      </Popover>
    </>
  );
};

export function NavDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div>
      <HStack justify={"space-between"}>
        <Heading ref={btnRef} colorScheme="teal" onClick={onOpen} w="100px">
          =
        </Heading>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <Heading as={Link} to="/" fontFamily="mono">
                LOGO
              </Heading>
            </DrawerHeader>

            <DrawerBody>
              <Stack justify={"space-evenly"} gap="20px">
                {LINKS.map((main) => (
                  <div key={main.type}>
                    <DropDown main={main} />
                  </div>
                ))}
              </Stack>
              <Image
                src="https://cdn.modesens.com/umedia/1713864s?w=800"
                position={"absolute"}
                bottom="0"
                w="295px"
              />
            </DrawerBody>

            <DrawerFooter zIndex={"20"}>
              <Stack w="100%">
                <Button>{/* <CartDrower /> */}</Button>
                <Button onClick={onClose} as={Link} to="/login">
                  LOGIN
                </Button>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </HStack>
    </div>
  );
}

const LINKS = [
  {
    type: "blush",
    category: ["powder", "cream"],
    tag: ["Natural", "Vegan", "Gluten Free", "Non-GMO", "Canadian"],
  },
  {
    type: "bronzer",
    category: ["powder"],
    tag: [
      "purpicks",
      "EWG Verified",
      "Vegan",
      "Gluten Free",
      "Natural",
      "Canadian",
    ],
  },
  {
    type: "eyeliner",
    category: ["liquid", "pencil", "gel", "cream"],
    tag: [
      "Natural",
      "Organic",
      "purpicks",
      "CertClean",
      "Vegan",
      "Gluten Free",
    ],
  },
  {
    type: "lipstick",
    category: ["lipstick"],
    tag: [
      "cruelty free",
      "Chemical Free",
      "Organic",
      "purpicks",
      "CertClean",
      "Vegan",
      "Gluten Free",
    ],
  },
  {
    type: "nail_polish",
    category: [],
    tag: [
      "Natural",
      "Vegan",
      "Gluten Free",
      "Fair Trade",
      "Sugar Free",
      "Non-GMO",
      "Dairy Free",
      "Canadian",
    ],
  },
];
