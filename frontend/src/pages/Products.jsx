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
  Center,
} from "@chakra-ui/react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import FilterComponent, { FilterDrower } from "../components/FilterComponent";
import { get_products } from "../redux/products/actions";
import { BorderStyle } from "../styles/global";

export default function Products() {
  const { PRODUCTS, loading } = useSelector((store) => store.productsManager);
  const dispatch = useDispatch();
  const { search } = useLocation();
  let params = new URLSearchParams(search);
  let entries = params.entries();
  let { product_type, category, brand, min, max, sort } =
    Object.fromEntries(entries);

  useEffect(() => {
    dispatch(get_products({ product_type, category, brand, min, max, sort }));
    document.documentElement.scrollTop = 0;
  }, [dispatch, product_type, category, brand, min, max, sort]);

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
          <GridItem rowSpan={50000} colSpan={1} {...BorderStyle}>
            <FilterComponent />
          </GridItem>
        </Show>
        {!PRODUCTS.length ? (
          <Center>
            <Heading>No data found ({PRODUCTS.length})</Heading>
          </Center>
        ) : (
          PRODUCTS?.map((product) => (
            <Stack
              key={product._id}
              {...BorderStyle}
              justify="space-between"
              textTransform={"uppercase"}
              _hover={{ border: "1px solid black" }}
              h="400px"
              as={Link}
              to={`/products/${product._id}`}
            >
              <Skeleton
                isLoaded={!loading}
                display="inline-block"
                overflowY={"hidden"}
              >
                <Image
                  src={product.api_featured_image}
                  alt={product.name}
                  w="100%"
                />
              </Skeleton>

              <Stack>
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
                    w={{ base: "200px" }}
                  >
                    {product.brand || "brand"}
                  </Text>
                  <Text>$ {product.price}</Text>
                </HStack>
              </Stack>
            </Stack>
          ))
        )}
      </Grid>
    </>
  );
}
