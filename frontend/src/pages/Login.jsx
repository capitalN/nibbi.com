// react imports
import React, { useEffect, useState } from "react";

// chakra imports
import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../utils/url";
import axios from "axios";
import { ButtonStyle } from "../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { user_login } from "../redux/auth/actions";

const initialData = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.authManager);

  const [inputData, setInputData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(user_login(inputData));
    setInputData(initialData);
  };

  const Router = useParams();
  if (isAuth) {
    Router.back();
  }

  return (
    <Center h="91vh">
      <Stack w="300px">
        <Heading>LOGIN</Heading>
        <br />
        <p>email</p>
        <Input
          onChange={handleChange}
          name="email"
          value={inputData.email}
          type="email"
        />
        <p>password</p>
        <Input
          onChange={handleChange}
          name="password"
          value={inputData.password}
          type="password"
        />
        <br />
        <Button onClick={handleSubmit} {...ButtonStyle}>
          LOGIN
        </Button>
        <br />
        <Text as={Link} to={"/register"} textAlign="center">
          new user? click here to SIGN UP
        </Text>
      </Stack>
    </Center>
  );
}
