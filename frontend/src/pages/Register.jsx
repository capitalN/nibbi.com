// react imports
import React, { useState } from "react";

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
import {Link} from "react-router-dom";
import { ButtonStyle } from "../styles/global";
import { useDispatch } from "react-redux";
import { user_register } from "../redux/auth/actions";

const initialData = {
  email: "",
  password: "",
};

export default function Register() {
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(user_register(inputData));
    setInputData(initialData);
  };

  return (
    <Center h="80vh">
      <Stack w="300px">
        <Heading>REGISTER</Heading>
        <br />
        <p>name</p>
        <Input
          onChange={handleChange}
          name="name"
          value={inputData.name}
          type="name"
        />
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
          SIGN UP
        </Button>
        <br />
        <Text as={Link} to={"/login"} textAlign="center">
          already a user? click here to LOGIN
        </Text>
      </Stack>
    </Center>
  );
}
