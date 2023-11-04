
import {useState,useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { IoAddCircle } from "react-icons/io5";

function App() {

  console.log("ToDO List")

const [items,setItems]=useState(localStorage.getItem("ToDoList")? JSON.parse(localStorage.getItem("ToDoList")):[] );
const [currentItems, setCurrentItems]=useState({text:'', key:'',completed:false,isEditingEnabled:false})

useEffect(()=>{
const input=document.getElementById('cursorfocus')
input.focus()
},[])


function handleChange(e){
  console.log(e.target.value.length)

  setCurrentItems({text:e.target.value,key:Date.now(),completed:false,isEditingEnabled:false})
}

function addTODo(e){
  e.preventDefault();
  if(currentItems.text.trim().length){
    const updatedList=[...items,currentItems]
        setItems(updatedList)
        localStorage.setItem("ToDoList",JSON.stringify(updatedList))
       setCurrentItems({text:'', key:''})
       console.log(items.text)
}
else alert('Input cannot be empty!')   
}

function editTodo(key){
  const newList=items?.map((item)=>{
    if(item.key===key){
      item.isEditingEnabled=true;
    }
    else {
      item.isEditingEnabled=false;
    }
    return item
   })
   setItems(newList)
}
function updateTodo(key,newText){
  console.log(newText)
  console.log(newText.trim().length)
  const newList=items?.map((item)=>{
    if(item.key===key)
    {
      if(newText.trim().length){
        item.isEditingEnabled=false;
        item.text=newText 
      }
      else {
        alert('Edited ToDo cannot be Empty!')
      }
    }
  
     return item;
   })
   setItems(newList)
   localStorage.setItem("ToDoList",JSON.stringify(newList))
}

function deleteTodo(key){
   const undeleted=items?.filter((item)=>{
    return item.key !== key
   })
   const newundeletedList=undeleted?.map((item)=>{

     item.isEditingEnabled=false;
    return item
   })
   console.log(newundeletedList)
   setItems(newundeletedList)
  localStorage.setItem("ToDoList",JSON.stringify(newundeletedList))
}

function completedTodo(key){
  const uncompletedTodo=items?.map((item)=>{
    item.isEditingEnabled=false
    if(item.key===key){
      item.completed=!item.completed;
    }
    return item

   })
   setItems(uncompletedTodo)
   localStorage.setItem("ToDoList",JSON.stringify(uncompletedTodo))

}

  return (
    <div className='App'>
      <div className='todo-container'>
        <h1>Todo List</h1>
          <form className='todo-items' onSubmit={addTODo}>
          <input type="text"  value={currentItems.text} onChange={handleChange} id='cursorfocus' placeholder='Enter ToDo'></input>
          {/* <div className='add-button'>
          
          </div> */}
          <IoAddCircle  fontSize={32} style={{cursor: "pointer"}} onClick={addTODo}/>
          </form>
          <TodoList items={items}  deleteTodo={deleteTodo} completedTodo={completedTodo} editTodo={editTodo} updateTodo={updateTodo}/>
    
      </div>
    </div>
  );
}

export default App;
