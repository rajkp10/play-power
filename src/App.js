import ListContent from "./components/ListContent";
import AddSection from "./components/AddSection";
import { VStack } from "@chakra-ui/react";
import "./App.css";
import { motion } from "framer-motion";

function App() {
  return (
    <VStack
      w="100vw"
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ListContent />
      <AddSection />
    </VStack>
  );
}

export default App;
