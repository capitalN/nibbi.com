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

export default function CartDrower() {
  const { CART } = useSelector((store) => store.cartManager);
  const { token, isAuth } = useSelector((store) => store.authManager);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_cart());
  }, []);

  // related to drower opening
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  if ((!token && !isAuth) || !CART) {
    return;
  }

  console.log(CART);

  return (
    token && (
      <>
        <button onClick={onOpen}>
          <RiShoppingBagLine size={"25px"} />
        </button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>CART</DrawerHeader>
            <Divider />
            <DrawerBody>
              {CART.length ? (
                CART?.map((el) => (
                  <div key={el.item._id}>
                    <Stack border={"1px solid #d6d6d6"} m="15px" h="280px">
                      <HStack justify={"space-between"} p="8px">
                        <Text>{el.item.name}</Text>
                        <Text
                          cursor={"pointer"}
                          onClick={() => dispatch(delete_from_cart(el._id))}
                          color="red"
                        >
                          X
                        </Text>
                      </HStack>

                      <Box display="inline-block" overflowY={"hidden"} w="100%">
                        <Image
                          src={el.item.api_featured_image}
                          alt={el.item.name}
                        />
                      </Box>
                      <HStack
                        justify={"space-between"}
                        border="1px solid"
                        p="10px"
                        bgColor={"black"}
                        color="white"
                        fontWeight={"bold"}
                      >
                        <Text>{el.item.brand}</Text>
                        <Text>$ {el.item.price}</Text>
                      </HStack>
                    </Stack>
                  </div>
                ))
              ) : (
                <Box>
                  <Image
                    w="100%"
                    src="https://media.istockphoto.com/id/841884438/vector/empty-shopping-bag-icon-cute-disappointed-shopping-bag-flat-thin-line-design-isolated-vector.jpg?s=612x612&w=0&k=20&c=q4-NaJiL4BG8kIEIsU5N0Wgy_9zv6_dJutV1qfs1_x4="
                  />
                </Box>
              )}
            </DrawerBody>
            <DrawerFooter justifyContent={"space-between"}>
              <Button
                as={Link}
                to="/checkout"
                colorScheme={""}
                borderRadius="0"
                w="100%"
                onClick={onClose}
              >
                CHECKOUT
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  );
}
