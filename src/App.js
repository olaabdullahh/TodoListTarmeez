import * as React from "react";
import TodoListTa from "./TodoListTa";
import "./App.css"
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { TodoContext } from "./Context/TodoList";
import { useState , useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const theme = createTheme({
  typography:{
    fontFamily:["Alexandria"]
  },
  palette: {
    primary: {
      main: "#00695f",
    }
  },
})

let todosUi = [
  {
    id: uuidv4(),
    title: "إنهاء كورس ريآكت",
    isDone: false,
  },
  {
    id: uuidv4(),
    title: " البدء بكورس جديد",
    isDone: false,
  },
  {
    id: uuidv4(),
    title: " قراءة كتاب",
    isDone: false,
  },
];
function App() {
  const [todos, setTodos] = useState(todosUi);
useEffect(()=>{
const storageTodo = JSON.parse(localStorage.getItem("todo")) ?? []
setTodos(storageTodo)
}, [])
  return (
    <ThemeProvider theme={theme}>
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        direction:"rtl",
        backgroundColor: "gray",
      }}
    >
      <TodoContext.Provider value={{todos, setTodos}}>
      <TodoListTa />
      </TodoContext.Provider>
    </div>
    </ThemeProvider>
  );
}

export default App;
