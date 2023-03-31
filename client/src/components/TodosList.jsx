import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import axios from "axios";

const TodosList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/todos")
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const todoList = () => {
        return todos.map((currentTodo) => {
            return (
                <tr key={currentTodo._id}>
                    <td>{currentTodo.description}</td>
                    <td>
                        {currentTodo.completed ? (
                            <span className="badge badge-success">
                                Completed
                            </span>
                        ) : (
                            <span className="badge badge-warning">
                                Incomplete
                            </span>
                        )}
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center">Todos List</h3>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <Todo key={todo._id} todo={todo} setTodos={setTodos} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodosList;
