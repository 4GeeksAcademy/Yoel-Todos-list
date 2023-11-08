import React, { useState, useEffect } from "react";

export const Todos = () => {

    const [task, setTask] = useState("")
    const [list, setList] = useState([])

    const handleTask = (e) => {
        setTask(e.target.value)
    }

    const handleList = (e) => {
        if(e.key === "Enter" && task.trim() != ""){
            setList(list.concat([task]))
            setTask("")
        }
    }

   
    
    return (
        <div className="container">
            <ul className="toDoList">
                <h1>My Todos</h1>
                <li>
                    <input placeholder="Write new task" onChange={handleTask} onKeyDown={handleList} value={task} type="text"></input>
                </li>
                {list.map((item, index) => (
                    <li>
                        {item}
                        <i 
                            class="fa-solid fa-trash" 
                            onClick={()=> setList(list.filter((currentItem, currentIndex) => index != currentIndex))}>
                        </i>
                    </li>
                ))}
                <p>{list.length === 1 ? "You have only 1 task left!" : `${list.length === 0 ? "Congratulations! You have no tasks left!" : `${list.length} tasks left`}` } </p>
            </ul>

        </div>
    )
}