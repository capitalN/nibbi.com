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
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";
import SearchDrower from "./SearchDrower";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import {
  RiShoppingCartLine,
  RiAccountCircleLine,
  RiShoppingBagLine,
} from "react-icons/ri";
import { BorderStyle } from "../styles/global";
import { get_products } from "../redux/products/actions";

export default function Navbar() {
  const { query } = useParams();
  const { isAuth } = useSelector((store) => store.authManager);

  const { pathname } = useLocation();

  return (
    <>
      <HStack
        justify={"space-between"}
        bgColor={pathname === "/" ? "transperent" : "white"}
        zIndex="1000"
        h="65px"
        p="20px"
        as={"navbar"}
        position={pathname === "/" ? "fixed" : "sticky"}
        top="0"
        w="full"
      >
        <Show below="lg">
          <NavDrawer />
        </Show>

        <Show above="lg">
          <Box w="120px">
            <Heading as={Link} to="" fontFamily="cursive">
              nibbi
            </Heading>
          </Box>
          <HStack justify={"space-evenly"} gap="20px">
            {LINKS.map((main) => (
              <div key={main.type}>
                <DropDown main={main} />
              </div>
            ))}
            <Link to="/products">SHOP ALL</Link>
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
  // const dispatch = useDispatch();

  // const handleClick = (main, sub) => {
  //   dispatch(get_products({ product_type: main, products_tag: sub }));
  // };

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
          <Stack justify={"space-between"} p="20px">
            {/* <Stack w="140px">
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
            </Stack> */}

            <Stack w="140px">
              <Text
                as={Link}
                to={`/products?product_type=${main.type}`}
                _hover={{ fontWeight: "bold" }}
              >
                ALL
              </Text>
              {main.category &&
                main.category.map((category) => (
                  <Text
                    as={Link}
                    to={`/products?product_type=${main.type}&category=${category}`}
                    key={category}
                    _hover={{ fontWeight: "bold" }}
                    target="_self"
                    // onClick={() => (document.documentElement.scrollTop = 0)}
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
            <DrawerCloseButton />
            <DrawerHeader>
              <Heading as={Link} to="" fontFamily="cursive">
                nibbi
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
            </DrawerBody>

            <DrawerFooter zIndex={"20"}></DrawerFooter>
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
