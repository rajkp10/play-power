import React, { useState, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import {
  SAVE_SUCCESS,
  LOAD_SUCCESS,
  STANDARD_EMPTY_ERROR,
  STANDARD_ADDED_SUCCESS,
  FIRST_TUPLE_INDENT_ERROR,
  INDENT_SUCCESS,
  OUTDENT_NOT_POSSIBLE_ERROR,
  OUTDENTED_SUCCESS,
  STANDARD_DELETED_SUCSESS,
  SUCCESS,
  INFO,
  WARNING,
  ERROR,
} from "./actions";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [toggleIndent, setToggleIndent] = useState(false);
  const toast = useToast();

  const Save = () => {
    localStorage.setItem("items", JSON.stringify(data));
    popup(SAVE_SUCCESS, SUCCESS);
  };

  const Load = () => {
    setData(() => JSON.parse(localStorage.getItem("items")) || []);
    popup(LOAD_SUCCESS, INFO);
  };

  const handleChange = (e, id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, text: e.target.value };
      }
      return item;
    });
    setData(newData);
  };

  const AddItem = (item) => {
    if (!item.text) {
      popup(STANDARD_EMPTY_ERROR, ERROR);
      return;
    }
    setData([...data, item]);
    popup(STANDARD_ADDED_SUCCESS, SUCCESS);
  };

  const IndentItem = (id) => {
    const index = data.findIndex((item) => item.id === id);
    if (!index) {
      popup(FIRST_TUPLE_INDENT_ERROR, WARNING);
      return;
    }
    data[index].indent += 1;
    popup(INDENT_SUCCESS, SUCCESS);
    setToggleIndent(!toggleIndent);
  };

  const OutdentItem = (id) => {
    const index = data.findIndex((item) => item.id === id);
    if (data[index].indent === 0) {
      popup(OUTDENT_NOT_POSSIBLE_ERROR, WARNING);
      return;
    }
    data[index].indent -= 1;
    popup(OUTDENTED_SUCCESS, SUCCESS);
    setToggleIndent(!toggleIndent);
  };

  const DeleteItem = (id) => {
    const index = data.findIndex((item) => item.id === id);
    var newData = data.slice(0, index);
    var i;
    for (i = index + 1; i < data.length; i++) {
      if (data[index].indent < data[i].indent) {
        continue;
      } else {
        break;
      }
    }
    while (i < data.length) {
      newData.push(data[i]);
      i++;
    }
    setData(newData);
    popup(STANDARD_DELETED_SUCSESS, ERROR);
  };

  const popup = (msg, type) => {
    toast({
      title: msg,
      status: type,
      duration: 2000,
    });
  };

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        Save,
        Load,
        handleChange,
        AddItem,
        IndentItem,
        OutdentItem,
        DeleteItem,
        toggleIndent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
