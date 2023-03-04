import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  Divider,
  VStack,
  Box,
  HStack,
  Image,
  Stack,
  Skeleton,
  useStatStyles,
  Heading,
  Flex,
  Container,
  Grid,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  RiShoppingCartLine,
  RiAccountCircleLine,
  RiShoppingBagLine,
} from "react-icons/ri";

import { Link } from "react-router-dom";
import { ButtonStyle } from "../styles/global";
import { delete_from_cart, get_cart } from "../redux/cart/actions";

export default function Cart() {
  const { CART } = useSelector((store) => store.cartManager);
  const { token, isAuth } = useSelector((store) => store.authManager);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_cart());
  }, []);

  if ((!token && !isAuth) || !CART) {
    return;
  }

  let total = CART.reduce((acc, el, i) => acc + el.item.price * el.quantity, 0);

  return (
    token && (
      <Box h="100vh">
        <HStack
          p="20px"
          border={"1px solid #d6d6d6"}
          m="10px"
          justify={"space-between"}
        >
          <Heading fontFamily={"inherit"}>BAG ($ {total})</Heading>
          <Button {...ButtonStyle}>CHECKOUT</Button>
        </HStack>

        <Grid
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(4,1fr)",
            xl: "repeat(4,1fr)",
          }}
          textTransform="uppercase"
        >
          {CART.map((cart) => (
            <Stack
              p="20px"
              border={"1px solid #d6d6d6"}
              justify="space-between"
              textTransform={"uppercase"}
              _hover={{ border: "1px solid black" }}
              m="10px"
            >
              <Box
                display="inline-block"
                overflowY={"hidden"}
                // h="250px"
                // w="100%"
                as={Link}
                to={`/products/${cart.item._id}`}
              >
                <Image
                  src={cart.item.api_featured_image}
                  alt={cart.item.name}
                  w="100%"
                />
              </Box>
              <Stack>
                <Text
                  overflow={"hidden !important"}
                  display={"inline-block"}
                  whiteSpace="nowrap"
                  textOverflow={"ellipsis"}
                  w={{ base: "170px" }}
                  fontWeight="bold"
                >
                  {cart.item.name}
                </Text>
                <HStack justify={"space-between"}>
                  <Text
                    overflow={"hidden !important"}
                    display={"inline-block"}
                    whiteSpace="nowrap"
                    textOverflow={"ellipsis"}
                    w={{ base: "170px" }}
                  >
                    by {cart.item.brand || "brand"}
                  </Text>
                  <Text>$ {cart.item.price}</Text>
                </HStack>
                <HStack justify={"space-between"}>
                  <HStack gap="5px">
                    <button>-</button>
                    <button>{cart.quantity}</button>
                    <button>+</button>
                  </HStack>
                  <button>remove</button>
                </HStack>
              </Stack>
            </Stack>
          ))}
        </Grid>
      </Box>
    )
  );
}
