import React from "react";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

const Todo = ({ id, text, complete, state, setState }) => {
  const [todo, setTodo] = useState({
    id: id,
    text: text,
    complete: complete,
  });

  const handleChange = () => {
    const data = {
      text: text,
      complete: complete,
    };
    fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // Handle the response or update the UI accordingly
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the request
      });
    updateTodos();
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // Handle the response or update the UI accordingly

        fetch("http://localhost:3000/api/v1/tasks")
          .then((response) => response.json()) // Add 'return' here
          .then((data) => {
            setState(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the request
      });
  };

  const updateTodos = () => {
    setState((prevState) => {
      const newState = prevState.map((state) => {
        if (state._id === id) {
          return { ...state, todo }; // Update the todo
        } else {
          return state; // Return the original state
        }
      });
      console.log(newState);
      return newState;
    });
  };

  return (
    <div className="bg-white mt-5 px-5 p-4 font-bold text-red-800 flex justify-between md:mx-28 md:p-8 lg:mx-60">
      <Typography
        variant="body1"
        style={{ textDecoration: text.complete ? "line-through" : "none" }}
      >
        {todo.text}
      </Typography>
      <div>
        <Checkbox
          checked={todo.complete}
          onChange={() => {
            setTodo({ ...todo, complete: !todo.complete });
            handleChange();
          }}
        />
        <DeleteIcon
          className="cursor-pointer"
          onClick={() => {
            handleDelete();
          }}
        />
      </div>
    </div>
  );
};

export default Todo;
