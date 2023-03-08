import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { add_to_cart, get_cart } from "../redux/cart/actions";
import { get_single_product } from "../redux/products/actions";
import { BorderStyle, BoxStyle, ButtonStyle } from "../styles/global";

export default function SingleProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const toast = useToast();
  const { PRODUCTS, error, payload, loading } = useSelector(
    (store) => store.productsManager
  );
  const { token, isAuth, user } = useSelector((store) => store.authManager);
  const ITEM = PRODUCTS[0];

  useEffect(() => {
    if (id) {
      dispatch(get_single_product({ id }));
    } else {
      return;
    }
  }, [id]);

  const handleAdd = async (id) => {
    if (!isAuth) {
      toast({
        title: "Please login first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    let { email } = user;
    dispatch(
      add_to_cart({
        quantity: 1,
        cartId: id + email,
        item: ITEM,
      })
    );
  };

  console.log(error);

  return (
    PRODUCTS?.length && (
      <Box>
        <Grid
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(1,1fr)",
            md: "repeat(1,1fr)",
            lg: "repeat(2,1fr)",
          }}
        >
          <Skeleton isLoaded={!loading} {...BorderStyle}>
            <Image src={ITEM.api_featured_image} w="100%" />
          </Skeleton>
          <Stack {...BorderStyle} gap="10px">
            <HStack justify={"space-between"}>
              <Heading textAlign={"left"} fontFamily="inherit">
                {ITEM.name}
              </Heading>
              <Badge fontSize={"20px"} colorScheme="yellow" >
                ★ {ITEM.rating || 3.5}
              </Badge>
            </HStack>
            <Text>by {ITEM.brand?.toUpperCase()}</Text>
            <Divider />
            <Text fontWeight={"bold"}>
              ✦ Earn 550 reward points when purchasing this product as a rewards
              member*
            </Text>
            <Heading size={"lg"}>$ {ITEM.price}</Heading>
            <Text>CATEGORY : {ITEM.category}</Text>
            <Text>TYPE : {ITEM.product_type}</Text>
            <Text>TAGS : {ITEM.tag_list}</Text>
            <Button {...ButtonStyle} onClick={() => handleAdd(ITEM._id)}>
              ADD TO CART
            </Button>
            <Divider />
            <Text>DESCRIPTION</Text>
            <Text>
              {ITEM.description ||
                "all natural ingredients that applies like a soft cream but finishes like a silky powder. Antioxidant-rich botanicals help moisturize the skin, while natural pigments provide long-lasting buildable color for a healthy, radiant glow. Made with natural and organic ingredients"}
            </Text>
          </Stack>
        </Grid>
      </Box>
    )
  );
}
