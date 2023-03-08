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
  useToast,
  Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { BorderStyle, ButtonStyle } from "../styles/global";
import { delete_from_cart, get_cart, update_cart } from "../redux/cart/actions";

export default function Cart() {
  const store = useSelector((store) => store.cartManager);
  const { token, isAuth } = useSelector((store) => store.authManager);
  const dispatch = useDispatch();

  const CART = store.CART || [];
  const loading = store.loading;

  useEffect(() => {
    dispatch(get_cart());
  }, []);

  let total = CART?.reduce(
    (acc, el, i) => acc + el.item.price * el.quantity,
    0
  );
  localStorage.setItem("total", total.toFixed(2));

  const handleUpdate = (id, qty, val) => {
    let quantity = qty + val;
    dispatch(update_cart(id, { quantity }));
  };

  return isAuth ? (
    <Skeleton isLoaded={!loading}>
      <Stack minH="100vh">
        {!CART.length ? (
          <VStack>
            <Image src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0=" />
            <Heading fontFamily={"inherit"}>Cart is Empty!!!</Heading>
            <br />
            <Link to="/products">Click here to Continue Shopping</Link>
          </VStack>
        ) : (
          <>
            <Grid
              gridTemplateColumns={{
                base: "repeat(1,1fr)",
                sm: "repeat(2,1fr)",
                md: "repeat(2,1fr)",
                lg: "repeat(3,1fr)",
                xl: "repeat(4,1fr)",
              }}
              textTransform="uppercase"
            >
              {CART.map((cart) => (
                <Stack
                  {...BorderStyle}
                  justify="space-between"
                  textTransform={"uppercase"}
                  _hover={{ border: "1px solid black" }}
                  h="400px"
                >
                  <Box
                    display="inline-block"
                    overflowY={"hidden"}
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
                        {cart.item.brand || "brand"}
                      </Text>
                      <Text>$ {cart.item.price}</Text>
                    </HStack>
                    <HStack justify={"space-between"}>
                      <HStack gap="5px">
                        <button
                          onClick={() =>
                            handleUpdate(cart._id, cart.quantity, -1)
                          }
                          disabled={cart.quantity === 1}
                        >
                          -
                        </button>
                        <button>{cart.quantity}</button>
                        <button
                          onClick={() =>
                            handleUpdate(cart._id, cart.quantity, +1)
                          }
                          disabled={cart.quantity === 10}
                        >
                          +
                        </button>
                      </HStack>
                      <button
                        onClick={() => dispatch(delete_from_cart(cart._id))}
                      >
                        remove
                      </button>
                    </HStack>
                  </Stack>
                </Stack>
              ))}
            </Grid>
          </>
        )}
      </Stack>
      {CART.length && (
        <HStack
          {...BorderStyle}
          justify={"space-between"}
          position="sticky"
          bottom={0}
          bgColor="white"
        >
          <Heading fontFamily={"inherit"} size="md">
            BAG [ ${total.toFixed(1)} ]
          </Heading>
          <Button {...ButtonStyle} as={Link} to="/checkout">
            CHECKOUT
          </Button>
        </HStack>
      )}
    </Skeleton>
  ) : (
    <Center h="80vh">
      <Box>
        <Heading fontFamily={"inherit"}>Please login first</Heading>
        <br />
        <Link to="/login">Click here to LOGIN</Link>
      </Box>
    </Center>
  );
}
