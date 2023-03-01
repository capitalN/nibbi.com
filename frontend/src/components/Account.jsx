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
} from "@chakra-ui/react";

import React from "react";
import { useSelector } from "react-redux";

export default function Account() {
  const { isAuth, user } = useSelector((store) => store.authManager);

  return (
    <div>
      <Popover>
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
            <Button>LOGOUT</Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
