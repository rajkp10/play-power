import React from "react";
import {
  Text,
  HStack,
  Box,
  ButtonGroup,
  Divider,
  Tooltip,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { motion, Reorder, useDragControls } from "framer-motion";
import {
  UpDownIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { useGlobalContext } from "../assets/context";
// import "../App.css";
import { useEffect } from "react";

function Item({ item }) {
  const { handleChange, DeleteItem, IndentItem, OutdentItem, toggleIndent } =
    useGlobalContext();
  const dragControls = useDragControls();
  const { id, text, indent } = item;

  useEffect(() => {}, [toggleIndent]);

  return (
    <Reorder.Item
      id={id}
      value={item}
      dragListener={false}
      dragControls={dragControls}
    >
      <HStack
        w="100%"
        m={4}
        as={motion.div}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <HStack w="50%">
          <ButtonGroup cursor="pointer">
            <Tooltip label="Move">
              <UpDownIcon
                _hover={{ color: "Aqua" }}
                onPointerDown={(e) => dragControls.start(e)}
              />
            </Tooltip>
            <Tooltip label="Outdent">
              <ArrowBackIcon
                _hover={{ color: "Aqua" }}
                onClick={() => {
                  OutdentItem(id);
                }}
              />
            </Tooltip>
            <Tooltip label="Indent">
              <ArrowForwardIcon
                _hover={{ color: "Aqua" }}
                onClick={() => IndentItem(id)}
              />
            </Tooltip>
            <Tooltip label="Delete">
              <DeleteIcon
                _hover={{ color: "red" }}
                onClick={() => DeleteItem(id)}
              />
            </Tooltip>
          </ButtonGroup>
        </HStack>
        <HStack w="50%" pl={indent * 8}>
          <Box h="1rem" w="1rem" bgColor="gray.100"></Box>
          <Editable
            value={text ? text : "Empty !!!"}
            fontSize={24 - indent * 6}
            textColor={indent ? "#999" : "aqua"}
            fontWeight={indent ? "none" : "bold"}
          >
            <EditablePreview />
            <EditableInput onChange={(e) => handleChange(e, id)} />
          </Editable>
        </HStack>
      </HStack>
      <Divider w="100%" />
    </Reorder.Item>
  );
}

export default Item;
