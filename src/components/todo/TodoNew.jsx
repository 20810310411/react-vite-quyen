import { useState } from "react";

const TodoNew = (props) => {

  const {addNewTodo} = props;
  //addNewTodo("cuadeptrai")

  const [valueInput, setValueInput] = useState("cua")

  const handleOnClick = () => {
        console.log(">>> check valueInput: ", valueInput)
  }
  const handleOnChange = (name) => {
    setValueInput(name)
  }

    return (
        <div className='todo-new'>
        <input type="text"
          onChange={(event) => {handleOnChange(event.target.value)}}
        />
        <button 
          style={{cursor: "pointer"}}
          onClick={handleOnClick}
        >Add</button>
        <div>
          My type is: {valueInput}
        </div>
      </div>
    )
}

export default TodoNew