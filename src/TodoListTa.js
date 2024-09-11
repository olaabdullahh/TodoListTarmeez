import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import { Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useContext } from "react";
import { TodoContext } from "./Context/TodoList";

export default function TodoListTa() {
  const { todos, setTodos } = useContext(TodoContext);
  const [titleTodo, setTitleTodo] = useState("");
  const [displayTodo, setDisplayTodo] = useState("all");

  const todoIsDone = todos.filter((t) => {
    return t.isDone;
  });
  const todoNotDone = todos.filter((t) => {
    return !t.isDone;
  });
  let todosTobeRender = todos;
  if (displayTodo === "not-done") {
    todosTobeRender = todoNotDone;
  } else if (displayTodo === "done") {
    todosTobeRender = todoIsDone;
  } else {
    todosTobeRender = todos;
  }

  const todosMap = todosTobeRender.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });
  function handelChangeDisplayTodo(e) {
    setDisplayTodo(e.target.value);
  }
  function handleBtnClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleTodo,
      isDone: false,
    };
    const todosNew = [...todos, newTodo];
    setTodos(todosNew);
    setTitleTodo("");

    localStorage.setItem("todo", JSON.stringify(todosNew));
  }

  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh" , overflow:"scroll"}}>
        <CardContent>
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider />
          {/* button group */}
          <ToggleButtonGroup
            value={displayTodo}
            exclusive
            onChange={handelChangeDisplayTodo}
            style={{ direction: "ltr", marginTop: "30px" }}
            color="primary"
          >
            <ToggleButton value="not-done">غير المنجز</ToggleButton>
            <ToggleButton value="done">المنجز</ToggleButton>
            <ToggleButton value="all"> الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* ====button group */}
          {todosMap}
          <Grid container style={{ marginTop: "20px" }}>
            <Grid
              xs={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                value={titleTodo}
                onChange={(e) => {
                  setTitleTodo(e.target.value);
                }}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                style={{ width: "100%", marginLeft: "5px" }}
              />
            </Grid>
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                onClick={handleBtnClick}
                variant="contained"
                style={{ width: "100%", height: "100%" , background:"primary" }}
                disabled={titleTodo.length == 0 }
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
