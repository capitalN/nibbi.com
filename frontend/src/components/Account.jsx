import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";

import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ButtonStyle } from "../styles/global";
import { useToastCompo } from "../utils/useToast";
import { Link } from "@chakra-ui/react";

export default function Account() {
  const { token, user } = useSelector((store) => store.authManager);
  const { Toast } = useToast();

  useEffect(() => {}, []);

  return (
    user && (
      <div>
        <Popover trigger="hover">
          <PopoverTrigger>
            <button style={{ fontSize: "30px" }}>
              {user.name[0].toUpperCase()}
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight={"bold"}>
              {user.name.toUpperCase()}
            </PopoverHeader>
            <PopoverBody>
              <Text>{user.email}</Text>
              <br />
              <Button
                w="100%"
                borderRadius={"0"}
                colorScheme={"red"}
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                LOGOUT
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    )
  );
}
