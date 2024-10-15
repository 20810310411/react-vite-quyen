import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import reactLogo from './assets/react.svg'


function App() {

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
      />
      <div className='todo-img'>
        <img src={reactLogo} className='logo'/>
      </div>
    </div>
  )
}

export default App
