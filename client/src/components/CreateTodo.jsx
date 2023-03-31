import React, { useState } from "react";
import axios from "axios";

const CreateTodo = () => {
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeCompleted = (e) => {
        setCompleted(e.target.checked);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            description: description,
            completed: completed,
        };

        axios
            .post("http://localhost:5000/todos/add", newTodo)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));

        setDescription("");
        setCompleted(false);
    };

    return (
        <div className="container mt-4">
            <h3>Create New Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="completed"
                            checked={completed}
                            onChange={onChangeCompleted}
                        />
                        <label className="form-check-label" htmlFor="completed">
                            Completed
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Create Todo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTodo;
