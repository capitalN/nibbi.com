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
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
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
  const { isAuth, token, payload } = useSelector((store) => store.authManager);
  const [inputData, setInputData] = useState(initialData);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(user_login(inputData));
    window.location.reload();
  };

  useEffect(() => {
    if (token && isAuth) {
      alert("login successfull");
      navigate("/");
    }
  }, []);

  return (
    <Center h="100vh">
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
