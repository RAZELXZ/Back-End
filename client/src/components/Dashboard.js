import React, { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import ToDoCard from "./ToDoCard";
import NewTodo from "./NewTodo";

const Dashboard = () => {
    const {user, completeToDos, incompleteToDos} = useGlobalContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user && navigate) {
            navigate("/");
        }
    }, [user, navigate])
    //console.log(incompleteToDos);
    //console.log(completeToDos);
    return (
        <div className="dashboard">
            <NewTodo />
            <div className="todos">
                {incompleteToDos.map((toDo) => (
                    //console.log(toDo.content);
                    //<h1 key={toDo._id}>{toDo.content}</h1>
                    <ToDoCard todo={toDo} key={toDo._id}/>
                    //{console.log(toDo.content)}
                ))}
            </div>
            {completeToDos.length > 0 && (
                <div className="todos">
                    <h2 className="todos__title">Complete ToDo's</h2>
                    {completeToDos.map(toDo => (
                        //<h1 className="todos__title" key={toDo._id}>{toDo.content}</h1>
                        <ToDoCard todo={toDo} key={toDo._id}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard;