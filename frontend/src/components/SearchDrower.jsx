import React, { useEffect } from "react";
import {
  HStack,
  Text,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  Divider,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_searched_products } from "../redux/products/actions";
import { RiSearchLine } from "react-icons/ri";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchDrower() {
  // drower related
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // store
  const { PRODUCTS, loading, error } = useSelector(
    (store) => store.productsManager
  );
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(get_searched_products({ q: e.target.value, limit: 8 }));
  };

  return (
    <div>
      <button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <SearchIcon boxSize="24px" />
      </button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <DrawerHeader textAlign={"center"}>SEARCH</DrawerHeader>
            <HStack>
              <Input border={"1px solid"} onChange={handleSearch} />
            </HStack>
            {PRODUCTS.length &&
              PRODUCTS?.map((el) => (
                <div key={el._id}>
                  <Divider />
                  <br />
                  <HStack
                    as={Link}
                    to={`/products/${el._id}`}
                    justify="space-between"
                    onClick={onClose}
                  >
                    <Text>{el.name}</Text>
                    <Text>{el.brand}</Text>
                  </HStack>
                </div>
              ))}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
