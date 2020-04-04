import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

/* Reference - https://www.youtube.com/watch?v=hQAHSlTtcmY */

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    /* This effected will called only once as we've used an static empty array */
    const persistedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(persistedTodos){
      setTodos(persistedTodos)
    }
  }, [])

  useEffect(() => {
    /* This effect will be called everytime todos are modified */
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    /* In ReactJs, Don't ever change the state directly, take a copy of state & modify the state with the copy */
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    /* Fragmentation -> <></> (Without using fragmentation, we can return only one element)*/
    <>
      <TodoList todos ={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
