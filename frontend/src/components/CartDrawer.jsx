import React, { useEffect } from "react";
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
  const { CART, loading } = useSelector((store) => store.cartManager);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_cart());
  }, []);

  // related to drower opening
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
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
            {CART.length &&
              CART.map((el) => (
                <div key={el.item._id}>
                  <Skeleton isLoaded={!loading}>
                    <VStack>
                      <Box
                        display="inline-block"
                        overflowY={"hidden"}
                        h="250px"
                        w="100%"
                      >
                        <Image
                          src={el.item.api_featured_image}
                          alt={el.item.brand}
                        />
                      </Box>
                      <button
                        onClick={() => dispatch(delete_from_cart(el._id))}
                        // onClick={()=>{console.log(el._id)}}
                      >
                        delete
                      </button>

                      <Text>{el.item.brand}</Text>
                    </VStack>
                  </Skeleton>
                </div>
              ))}
          </DrawerBody>
          <DrawerFooter justifyContent={"space-between"}>
            <Button
              as={Link}
              to="/checkout"
              {...ButtonStyle}
              w="100%"
              onClick={onClose}
            >
              CHECKOUT
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
