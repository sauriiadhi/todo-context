import { useState } from 'react'
import './App.css'
import { TodoProvider } from './context/TodoContext';
import { useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos,setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevtodo) => [{id:Date.now(),...todo},...prevtodo])
  }
  const updateTodo = (id,todo) => {
    setTodos((prevtodo) => prevtodo.map((prevtodo) => (prevtodo.id === id) ? todo: prevtodo))
  }
  const completeTodo = (id) => {
    setTodos((prevtodo) => prevtodo.map((prevtodo) => (prevtodo.id === id) ? {...prevtodo,completed: !prevtodo.completed} : prevtodo))
  }
  const deleteTodo = (id) => {
    setTodos((prevtodo) => prevtodo.filter((prevtodo) => (prevtodo.id !== id)))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos,addTodo,completeTodo,deleteTodo,updateTodo}}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          <TodoForm/>
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo)=> (
            <div className='w-full' key={todo.id}>
              {console.log(todo.id)}
              <TodoItem todos={todo}/>
            </div>
          ))}
        </div>
      </div>
    </div>
    </TodoProvider>
  )
}

export default App
