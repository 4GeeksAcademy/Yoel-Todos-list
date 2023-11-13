import React, { useState, useEffect } from "react";

export const Todos = () => {

    const base_url = "https://playground.4geeks.com/apis/fake/todos";

    const [task, setTask] = useState("")
    const [list, setList] = useState([])

    const postUser = async () => {

        const url = base_url + "/user/Yoel"
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        }

        const response = await fetch(url, options)

        if (response.ok) {
            const data = await response.json()
            console.log("data: " + data)
            getUser()
        }
        else {
            console.log("Error", response.status, response.statusText)
        }
    }

    const getUser = async()=>{
        const url = base_url + "/user/Yoel"
        
        const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Yoel")
        if(response.ok){
            const data = await response.json()
                const filtered = data.filter((item) => item.label !== "example task")
                setList(filtered)    
        }
        else {
            console.log("Error: " + response.status, response.statusText)
            
        }
    }

    const putList = async (updatedList) => {
        const url = base_url + "/user/Yoel"
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedList)
        }
        if(updatedList.length > 0){
            const response = await fetch(url, options)
            if (response.ok) {
                getUser()
            }
            else {
                console.log("Error", response.status, response.statusText)
            
            }
        }
        else {
            deleteUser()
        }  
    }

    const deleteUser = async () => {

        const url = base_url + "/user/Yoel"
        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }
        
        const response = await fetch(url, options)
        if(response.ok){
            postUser()
        }
        else {
            console.log("Error: " + response.status, response.statusText)
            postUser()
        }
    }    

    useEffect(() => {
        postUser();
        getUser();
    }, []);
    

    const handleTask = (e) => {
        setTask(e.target.value)
    }

    
    
    const handleList = (e) => {
        e.preventDefault();
        if (task.trim() !== "") {
            const newList = [...list, { label: task, done: false }];
            putList(newList);
            setList(newList);
            setTask("")
        }
    };


    const deleteItem = (index) => {
            const newList = list.filter((currentItem, currentIndex) => index !== currentIndex);
            putList(newList);
            setList(newList);
    };
    


    return (
        <div className="container">
            <ul className="toDoList">
                <h1>My Todos</h1>
                <li>
                    <form onSubmit={handleList}>
                        <input placeholder="Write new task" onChange={handleTask} value={task} type="text"></input>
                    </form>
                </li>
                {list.length > 0 ? list.map((item, index) => (
                     <li>   
                        {item.label}
                        <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteItem(index)}>
                        </i>
                    </li> 
                    
                )) : "" }

                <p>{list.length === 1 ? "You have only 1 task left!" : `${list.length === 0 ? "Congratulations! You have no tasks left!" : `${list.length} tasks left`}`}</p>
            </ul>
           


        </div>
    )
}
