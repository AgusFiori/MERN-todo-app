import React, { useState } from "react";
import axios from "axios";

const Todo = (props) => {
    const [description, setDescription] = useState(props.todo.description);
    const [completed, setCompleted] = useState(props.todo.completed);
    const [isUpdatable, setIsUpdatable] = useState(false);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCompletedChange = () => {
        setCompleted(!completed);
    };

    const handleDeleteTodo = async () => {
        console.log(props.todos);
        try {
            await axios.delete(`http://localhost:5000/todos/${props.todo._id}`);
            props.setTodos(
                props.todos.filter((todo) => todo._id !== props.todo._id)
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateTodo = () => {
        setIsUpdatable(!isUpdatable);
        console.log(isUpdatable);
        // const updatedTodo = {
        //     description: description,
        //     completed: completed,
        // };

        // axios
        //     .put(`/todos/${props.todo._id}`, updatedTodo)
        //     .then((res) => console.log(res.data))
        //     .catch((err) => console.log(err));
    };

    return (
        <tr>
            <td>
                {isUpdatable ? (
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                ) : (
                    <p>{description}</p>
                )}
            </td>
            <td>
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={completed}
                    onChange={handleCompletedChange}
                />
            </td>
            <td>
                <button className="btn btn-primary" onClick={handleUpdateTodo}>
                    Update
                </button>
            </td>
            <td>
                <button className="btn btn-danger" onClick={handleDeleteTodo}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default Todo;
