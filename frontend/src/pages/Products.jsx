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
          base: "repeat(2,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
          xl: "repeat(5,1fr)",
        }}
      >
        <Show above="lg">
          <GridItem rowSpan={50000} colSpan={1}>
            <FilterComponent />
          </GridItem>
        </Show>
        {PRODUCTS.length &&
          PRODUCTS?.map((product) => (
            <Stack
              as={Link}
              to={`/products/${product._id}`}
              key={product._id}
              justify={"space-between"}
              align="center"
              border={"1px solid #D6D6D6"}
              p="10px 5px"
              position={"relative"}
              textAlign="center"
            >
              <Skeleton
                isLoaded={!loading}
                display="inline-block"
                overflowY={"hidden"}
                h="250px"
                w="100%"
              >
                <Image
                  src={product.api_featured_image}
                  alt={product.name}
                  w="100%"
                />
              </Skeleton>
              <Divider />
              <Box
                overflow={"hidden !important"}
                display={"inline-block"}
                whiteSpace="nowrap"
                textOverflow={"ellipsis"}
                w={{ base: "170px" }}
              >
                <Text
                  fontSize={"lg"}
                  overflow={"hidden !important"}
                  textOverflow={"ellipsis"}
                >
                  {product.brand ? product.brand.toUpperCase() : "BRAND"}
                </Text>
                <Text overflow={"hidden !important"} textOverflow={"ellipsis"}>
                  {product.name}
                </Text>
                <Badge>$ {product.price}</Badge>
              </Box>
            </Stack>
          ))}
      </Grid>
    </>
  );
}
