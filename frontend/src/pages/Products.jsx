import {
  Grid,
  Stack,
  Text,
  Box,
  GridItem,
  Show,
  Divider,
  Skeleton,
  Image,
  Badge,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import FilterComponent, { FilterDrower } from "../components/FilterComponent";
import { get_products } from "../redux/products/actions";

export default function Products() {
  const { PRODUCTS, loading } = useSelector((store) => store.productsManager);
  const dispatch = useDispatch();
  const { search } = useLocation();
  let params = new URLSearchParams(search);
  let entries = params.entries();

  useEffect(() => {
    dispatch(get_products(Object.fromEntries(entries)));
  }, [search]);

  return (
    <>
      <Show below="lg">
        <Box position={"fixed"} right="0" zIndex={"1000"}>
          <FilterDrower />
        </Box>
      </Show>
      <Grid
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
          xl: "repeat(4,1fr)",
        }}
      >
        <Show above="lg">
          <GridItem
            rowSpan={50000}
            colSpan={1}
            m="10px"
            border={"1px solid #d6d6d6"}
          >
            <FilterComponent />
          </GridItem>
        </Show>
        {PRODUCTS.length &&
          PRODUCTS?.map((product) => (
            <Skeleton
              isLoaded={!loading}
              h="400px"
              backgroundSize="cover"
              backgroundRepeat={"no-repeat"}
              backgroundPosition="center"
              bgImage={product.api_featured_image}
              position="relative"
              border={"1px solid #d6d6d6"}
              justify="space-between"
              textTransform={"uppercase"}
              as={Link}
              to={`${product._id}`}
              m="10px"
              _hover={{ border: "1px solid black" }}
            >
              <Stack
                position="absolute"
                bottom={"0"}
                w="100%"
                p="10px"
                // bgColor={"rgba(0, 0, 0, 0.5)"}
                // color="white"
                bgColor={"white"}
              >
                <Text
                  overflow={"hidden !important"}
                  display={"inline-block"}
                  whiteSpace="nowrap"
                  textOverflow={"ellipsis"}
                  w={{ base: "250px" }}
                  fontWeight="bold"
                >
                  {product.name}
                </Text>
                <HStack justify={"space-between"}>
                  <Text
                    overflow={"hidden !important"}
                    display={"inline-block"}
                    whiteSpace="nowrap"
                    textOverflow={"ellipsis"}
                    w="200px"
                  >
                    {product.brand || "brand"}
                  </Text>
                  <Text>$ {product.price}</Text>
                </HStack>
              </Stack>
            </Skeleton>
          ))}
      </Grid>
    </>
  );
}
