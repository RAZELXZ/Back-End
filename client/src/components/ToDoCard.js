import axios from "axios";
import React, { useRef, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const ToDoCard = ({todo}) => {
    const [content, setContent] = useState(todo.content);
    const [editing, setEditing] = useState(false);
    const input = useRef(null);
    const { markComplete, markIncomplete, deleteTd, saveTd } = useGlobalContext();
    const onEdit = e => {
        e.preventDefault();

        setEditing(true);
        input.current.focus();
    }

    const stopEditing = e => {
        if (e) {
            e.preventDefault();
        }

        setEditing(false);
        setContent(todo.content);
    }
    const onCancel = e => {
        e.preventDefault();

        setEditing(false);
        setContent(todo.content);
    }

    const markAsComplete = (e) => {
        e.preventDefault();
        axios.put(`api/todos/${todo._id}/complete`).then((res) => {
            markComplete(res.data);
        });
    }

    const markAsIncomplete = (e) => {
        e.preventDefault();
        axios.put(`api/todos/${todo._id}/Incomplete`).then((res) => {
            markIncomplete(res.data);
        });
    }

    const deleteToDo = (e) => {
        e.preventDefault();
        if (window.confirm("Are u sure?")) {
            axios.delete(`api/todos/${todo._id}`).then(
                () => {
                    deleteTd(todo);
                }
            );
        }
    }

    const saveTodo = (e) => {
        e.preventDefault();
        axios.put(`api/todos/${todo._id}`, {content}).then(
            () => {
                saveTd(todo);
                setEditing(false);
            }
        ).catch(() => {
            stopEditing();
        });
    }
    return (
        <div className={`todo ${todo.complete ? "todo--complete" : ""}`}>
            <input type="checkbox" checked={todo.complete} onChange={!todo.complete ? markAsComplete : markAsIncomplete}/>

            <input type="text" ref = {input} value={content} readOnly={!editing} onChange={(e) => setContent(e.target.value)}/>

            <div className="todo__controls">
                {!editing ? (
                    <>
                        {!todo.complete && <button onClick={onEdit}>Edit</button>}
                        <button onClick={deleteToDo}>Delete</button>
                    </>
                ) : (
                    <>
                        <button onClick={onCancel}>Cancel</button>
                        <button onClick={saveTodo}>Save</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ToDoCard;