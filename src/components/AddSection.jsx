import {
  Button,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  ButtonGroup,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useGlobalContext } from "../assets/context";

function AddSection() {
  const { Save, Load, AddItem } = useGlobalContext();
  const [content, setContent] = useState("");

  const handleAdd = () => {
    const item = {
      id: nanoid(),
      text: content,
      indent: 0,
    };
    AddItem(item);
    setContent("");
  };

  return (
    <Stack
      w={{ base: "90%", sm: "80%", md: "70%" }}
      direction={{ base: "column", md: "row" }}
    >
      <InputGroup>
        <Input
          variant="filled"
          value={content}
          placeholder="Add a Standard..."
          onChange={(e) => setContent(e.target.value)}
        />
        <InputRightElement w={{ base: "3rem", sm: "5rem" }}>
          <Button
            w="100%"
            borderLeftRadius="none"
            bgColor="aqua"
            onClick={handleAdd}
          >
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
      <ButtonGroup alignSelf="flex-end" isAttached>
        <Button colorScheme="green" onClick={Save}>
          Save
        </Button>
        <Button colorScheme="blue" onClick={Load}>
          Load
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

export default AddSection;
