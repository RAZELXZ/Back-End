import React, { useRef, useState } from "react";

const ToDoCard = ({todo}) => {
    const [content, setContent] = useState(todo.content);
    const [editing, setEditing] = useState(false);
    const input = useRef(null);
    const onEdit = e => {
        e.preventDefault();

        setEditing(true);
        input.current.focus();
    }
    const onCancel = e => {
        e.preventDefault();

        setEditing(false);
        setContent(todo.content);
    }
    return (
        <div className={`todo ${todo.complete ? "todo--complete" : ""}`}>
            <input type="checkbox" checked={todo.complete}/>

            <input type="text" ref = {input} value={content} readOnly={!editing} onChange={(e) => setContent(e.target.value)}/>

            <div className="todo__controls">
                {!editing ? (
                    <>
                        {!todo.complete && <button onClick={onEdit}>Edit</button>}
                        <button>Delete</button>
                    </>
                ) : (
                    <>
                        <button onClick={onCancel}>Cancel</button>
                        <button>Save</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ToDoCard;