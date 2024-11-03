import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

const Input = ({ setState }) => {
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    const data = {
      text: todo,
      complete: false,
    };

    fetch("http://localhost:3000/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

  return (
    <div className="bg-white text-center mt-9 md:mt-28 lg:mt-28 p-4 md:mx-28 lg:mx-60">
      <h1 className="font-bold text-red-800 text-2xl py-4">Enter Todo</h1>
      <TextField
        sx={{ width: "100%" }}
        id="outlined-basic"
        label="Todo"
        value={todo}
        variant="outlined"
        onChange={handleChange}
      />
      <div className=" py-6">
        <Button
          variant="contained"
          sx={{ backgroundColor: "#8B0000", color: "#ffffff" }}
          onClick={() => {
            console.log(todo);
            addTodo();
            setTodo("");
          }}
        >
          Submit
        </Button>
      </div>
      <LinearProgress
        variant="determinate"
        value={70}
        sx={{
          color: "red",
        }}
      />
    </div>
  );
};

export default Input;
