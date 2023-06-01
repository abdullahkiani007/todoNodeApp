import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import Todo from "./components/todo";

// Only thing that is remaining is that state of a component is not updated I have to refresh to see the changes

function App() {
  const [todos, settodos] = useState([]);
  const todo = todos.map((item) => {
    return (
      <Todo
        id={item._id}
        text={item.text}
        complete={item.complete}
        state={todos}
        setState={settodos}
      />
    );
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/tasks")
      .then((response) => response.json()) // Add 'return' here
      .then((data) => {
        settodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-gray-300 h-full min-h-screen">
      <Navbar />
      <Input setState={settodos} />
      {todo}
    </div>
  );
}

export default App;
