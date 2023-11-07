import React , {useState} from 'react'
import { AiFillCheckCircle, AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import "./TodoList.css"

function TodoList(props) {
    console.log(props.items)
    const[newTodo, setnewTodo]=useState("")

    const cursorFocus=(id)=>{
        setTimeout(()=>{
            const input=document.getElementById(id)
            input.focus()
        },0)
    }

    function handleChange(e){
     setnewTodo(e.target.value)  
    }

    const todoList=props?.items?.map(item =>{
        return (
           
            <div key={item.key} className='Todo-Item' style={{backgroundColor:item.isEditingEnabled ? "yellow":'aqua'}}>
                <input type="checkbox" onClick={()=>props.completedTodo(item.key)} checked={item.completed} disabled={item.isEditingEnabled} />
                { 
                item.isEditingEnabled ?
                <>
                <input type="text" id={item.key} defaultValue={item?.text} onChange={handleChange}/> 
                <AiFillCheckCircle
                 onClick={() => {
                props.updateTodo(item.key, newTodo ? newTodo : item.text);
                setnewTodo("");
              }}
                 fontSize={32}
                />
                </> :
                <>
                <p style={{textDecoration : item.completed ? 'line-through': 'none'}}>{item.text} </p> 
                {/* <button onClick={()=>{props.editTodo(item.key); cursorFocus(item.key)}} disabled={item.completed}  >EDIT</button> */}

                 <MdEditSquare
                 className={item.completed ? "icon-disabled" : "icon-enabled" }
                onClick={()=>{props.editTodo(item.key); cursorFocus(item.key)}}
                 disabled={item.completed}
                   fontSize={32}
             />
                </>
             }
            
        {/* <button onClick={()=>props.deleteTodo(item.key)}>DEL</button>
             */}
             <AiFillDelete
         className={item.isEditingEnabled ? "icon-disabled" : "icon-enabled" }
          onClick={() => props.deleteTodo(item.key)}
          fontSize={32}
        />

    </div>
        )            
    })
return(
<div className='Todo-List'>{todoList}</div>
)  
}

export default TodoList
