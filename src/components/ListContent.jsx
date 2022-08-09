import React from "react";
import { VStack, HStack, Heading, Text, Divider } from "@chakra-ui/react";
import Item from "./Item";
import { AnimatePresence, Reorder } from "framer-motion";
import { useGlobalContext } from "../assets/context";

function ListContent() {
  const { data, setData, toggleIndent } = useGlobalContext();

  return (
    <VStack
      m={4}
      w={{ base: "90%", sm: "80%", md: "70%" }}
      divider={<Divider />}
    >
      <Heading size="lg" textColor="#999" alignSelf="flex-start">
        Mathematics
      </Heading>
      <HStack w="100%">
        <VStack w="50%" alignItems="flex-start">
          <Heading size="md">Actions</Heading>
          <Text size="sm" textColor="#999">
            Move,Ident
          </Text>
          <Text size="sm" textColor="#999">
            Outdent,Delete
          </Text>
        </VStack>
        <VStack w="50%" alignItems="flex-start">
          <Heading size="md">Standard</Heading>
          <Text size="sm" textColor="#999">
            The text of the standard
          </Text>
        </VStack>
      </HStack>
      <Reorder.Group axis="y" values={data} onReorder={setData}>
        <AnimatePresence>
          {data.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </AnimatePresence>
      </Reorder.Group>
    </VStack>
  );
}

export default ListContent;
