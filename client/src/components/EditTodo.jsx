import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTodo = (props) => {
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/todos/${props.match.params.id}`)
            .then((response) => {
                setDescription(response.data.description);
                setCompleted(response.data.completed);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.match.params.id]);

    const onSubmit = (e) => {
        e.preventDefault();

        const todo = {
            description: description,
            completed: completed,
        };

        axios
            .put(`/api/todos/${props.match.params.id}`, todo)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));

        props.history.push("/");
    };

    return (
        <div>
            <h3>Edit Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-check form-group">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    <label className="form-check-label">Completed:</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Todo
                </button>
            </form>
        </div>
    );
};

export default EditTodo;
