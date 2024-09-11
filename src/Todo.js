import { Card, CardContent, Typography, Grid } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useContext, useState } from "react";
import { TodoContext } from "./Context/TodoList";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const [showAlert, setShowAlert] = useState(false);
  const [showDialogUpdat, setShowDialogUpdate] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodoContext);
  function handelClickCheck() {
    const todosUp = todos.map((t) => {
      if (t.id === todo.id) {
        t.isDone = !t.isDone;
      }
      return t;
    });

    setTodos(todosUp);
    localStorage.setItem("todo", JSON.stringify(todosUp))
  }
  // handel Click btns
  // Handel Delete
  function handelDelClick() {
    setShowAlert(true);
  }
  function handleDeletTodo() {
    const TodoDel = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(TodoDel);
    localStorage.setItem("todo", JSON.stringify(TodoDel))
  }
  // ==== Handel Delete =====//
  // Handel UpDate
  function handelUpdateClick() {
    setShowDialogUpdate(true);
  }
  function handelUpdateTodo() {
    const updated = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updateTodo.title, details: updateTodo.details };
      }
      return t;
    });
    setTodos(updated);
    setShowDialogUpdate(false);
    localStorage.setItem("todo", JSON.stringify(updated))
  }
  //==== Handel UpDate======= //
  // handel Click btns
  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={showAlert}
        // onClose={handleClose}
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ direction: "rtl" }}>
          {"هل تريد متأكد من رغبتك في حذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ direction: "rtl" }}
          >
            لا يمكنك التراجع عن الحذف في حال اختيار زر الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAlert(false);
            }}
          >
            لا شكرا
          </Button>
          <Button autoFocus onClick={handleDeletTodo}>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== Delete Dialog =====*/}
      {/* Update Dialog */}
      <Dialog open={showDialogUpdat}>
        <DialogTitle id="alert-dialog-title" style={{ direction: "rtl" }}>
          تعديل المهمة
        </DialogTitle>
        <DialogContent>
          <TextField
            style={{ direction: "rtl" }}
            autoFocus
            required
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />
          <TextField
            style={{ direction: "rtl" }}
            autoFocus
            required
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updateTodo.details}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowDialogUpdate(false);
            }}
          >
            لا شكرا
          </Button>
          <Button autoFocus onClick={handelUpdateTodo}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===== Update Dialog =====*/}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2} style={{ margin: "0px" }}>
            <Grid xs={8}>
              <Typography variant="h5" style={{ textAlign: "right" , textDecoration: todo.isDone ? "line-through" : "none" }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" style={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* IsDone Check */}
              <IconButton
                onClick={handelClickCheck}
                className="iconBtn"
                aria-label="delete"
                style={{
                  color: "#8bc34a",
                  backgroundColor: todo.isDone === false ? "white" : "green",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* ====IsDone Check=== */}
              {/* update btn */}
              <IconButton
                onClick={handelUpdateClick}
                className="iconBtn"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/*==== update btn==== */}
              {/* delete btn */}
              <IconButton
                onClick={handelDelClick}
                className="iconBtn"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  backgroundColor: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* ====delete btn ====*/}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
