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
  Link,
} from "@chakra-ui/react";

import React from "react";
import { useSelector } from "react-redux";

export default function Account() {
  const { isAuth, user } = useSelector((store) => store.authManager);
  return (
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
          <PopoverHeader>{user.name.toUpperCase()}</PopoverHeader>
          <PopoverBody>
            <Text>{user.email}</Text>
            <Link onClick={() => localStorage.clear()} href="/">
              LOGOUT
            </Link>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
