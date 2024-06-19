import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

function TodoApp() {
    const[todos, setTodos] = useState([]);

    const[newTodo, setNewTodo] = useState({taskName: '', description: '', state: 'Not Completed'});
    const [filter, setFilter] = useState ('all');

    const handleChange = (e) => {
        setNewTodo({
            ...newTodo, [e.target.name]: e.target.value
        })
    }
    const handleCreateTodo =() => {
        setTodos([...todos, newTodo]);
        setNewTodo({taskName: '', description: '', state: 'Not Completed'});
    }

    const handleUpdateTodoStatus = (index, newStatus) => {
        debugger
        const updatedTodos = todos.map((todo, i) => {
            if (i === index) {
                return { ...todo, status: newStatus }
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    const handleDeleteTodo = (index) => {
        debugger
        const updatedTodos = todos.filter((_, i) =>
            i !== index
        )

        setTodos(updatedTodos);
    }
    
    const handleEdit = (index) => {
        setNewTodo(todos[index]);
        setEditIndex(index);
      };

    const filteredTodes=todos.filter(todo => {
        if(filter ==='all'){
            return true;
        }
        return todo.status === filter;
    })
    return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Welcome! </h2>
    <div className="mb-3">
        <input type="text" className="form-control" name="taskName"
        placeholder="Task Name" value = {newTodo.taskName} onChange={handleChange} />
    </div>
    <div className="mb-3">
        <textarea  className="form-control" name="description"
        placeholder="Description" value = {newTodo.description} onChange={handleChange} />
    </div>
    <button className="btn btn-primary mb-3" onClick={handleCreateTodo}>Add Todo</button>
    <div className="mb-3">
        <select className="form-select" onChange = {(e) => setFilter(e.target.value)}>
            <option value="all">ALL</option>
            <option value="not completed">Not Completed</option>
            <option value="completed">Completed</option>
        </select>
    </div>
    <div className="row">
        {filteredTodes.map((todo, index) =>(
            <div key={index} className="col-lg-4 mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-titile">{todo.taskName}</h5>
                    <p className="card-text">{todo.description}</p>
                    <p className="card-text">Status: {todo.status}</p>
                    <button className='btn btn-secondary me-2'
                                    onClick={() => handleUpdateTodoStatus(index, todo.status === 'completed' ? 'not completed' : 'completed')}>
                                    {todo.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                                <button className='btn btn-danger' onClick={() => handleDeleteTodo(index)}>Delete</button>
                                <button className='btn btn-success' onClick={() => handleEdit(index)}>Edit</button>
                   </div>
                </div>
            </div>
        ))
    }

    </div>
</div>
)
}

export default TodoApp
