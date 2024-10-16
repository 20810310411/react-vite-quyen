import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import reactLogo from './assets/react.svg'
import { useState } from 'react'


function App() {

  const [todoList, setToDoList] = useState([
    {id: 1, name: "Learning React"},
    {id: 2, name: "Watching Youtube"}
  ])

  const name = "Cuadeptrai";
  const age = 22;
  const data = {
    address: "hanoi",
    country: "vietnam"
  }
  const addNewTodo = (name) => {
    alert(`call me ${name}`)
  }

  return (
    <div className="todo-container">
      <div className="todo-title"> Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo}
      />
      <TodoData
        name = {name}
        age = {age}
        data = {data}
        todoList = {todoList}
      />
      <div className='todo-img'>
        <img src={reactLogo} className='logo'/>
      </div>
    </div>
  )
}

export default App
