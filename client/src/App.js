import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import TodoList from "./components/TodosList";
import EditTodo from "./components/EditTodo";
import CreateTodo from "./components/CreateTodo";
import Navbar from "./components/Navbar";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("/todos")
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.log(error));
    }, []);

    const deleteTodo = (id) => {
        fetch(`/todos/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTodos(todos.filter((todo) => todo._id !== id));
            })
            .catch((error) => console.log(error));
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<TodoList todos={todos} deleteTodo={deleteTodo} />}
                />
                <Route path="/edit/:id" element={<EditTodo />} />
                <Route path="/create" element={<CreateTodo />} />
            </Routes>
        </Router>
    );
}

export default App;
