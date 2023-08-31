import axios from "axios";
import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const NewTodo = () => {
    const {addTodo} = useGlobalContext();
    const [content, setContent] = useState("");
    const submit = (e) => {
        e.preventDefault();

        axios.post("api/todos/new", { content }).then((res) => {
            setContent("");
            addTodo(res.data);
        })
    }
    return (
        <form className="new" onSubmit={submit}>
            <input type="text" value = {content} onChange={e => {setContent(e.target.value)}}/>
            <button className="btn" type="submit"> Submit </button>
        </form>
    )
}

export default NewTodo;