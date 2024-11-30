import React, {useState} from 'react'

const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState("")
    const handleSubmit = e => {
        e.preventDefault();
        addTodo(value);
        setValue("")
    }
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
        <input type="text" className='todo-input' placeholder='Впишите задачу' onChange={(e)=> setValue(e.target.value)} value={value}/>
        <button type='submit' className='todo-btn'>Добавить задачу</button>
    </form>
  )
}

export default TodoForm
