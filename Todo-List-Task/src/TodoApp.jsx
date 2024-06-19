import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Dropdown } from 'react-bootstrap';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Completed');
  const [filter, setFilter] = useState('Both');
  const [editIndex, setEditIndex] = useState(null);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleAddTodo = () => {
    const newTodo = { taskName, description, status };
    setTodos([newTodo, ...todos]);
    setTaskName('');
    setDescription('');
    setStatus('Not Completed');
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    setTaskName(todos[index].taskName);
    setDescription(todos[index].description);
    setStatus(todos[index].status);
    setEditIndex(index);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = { taskName, description, status };
    setTodos(updatedTodos);
    setTaskName('');
    setDescription('');
    setStatus('Not Completed');
    setEditIndex(null);
  };

  const handleSaveTodo = (index) => {
    handleUpdateTodo();
    handleEditTodo(index);
  };

  const handleStatusToggle = (index) => {
    const toggledTodos = [...todos];
    toggledTodos[index].status =
      toggledTodos[index].status === 'Not Completed'
        ? 'Completed'
        : 'Not Completed';
    setTodos(toggledTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Both') {
      return true;
    } else {
      return todo.status === filter;
    }
  });

  return (
    <div className="container">
      <h1 className="mt-4"><center>My Todo</center></h1>
      <div className="row">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Task Name"
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <select
            className="form-select mb-2"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>
          {editIndex !== null ? (
            <Button
              variant="primary"
              onClick={handleUpdateTodo}
              className="me-2"
            >
              Update Todo
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleAddTodo}
              className="me-2"
            >
              Add Todo
            </Button>
          )}
          {/* <Button
            variant="secondary"
            onClick={() => setFilter('Completed')}
            className="me-2"
          >
            Completed
          </Button>
          <Button
            variant="secondary"
            onClick={() => setFilter('Not Completed')}
            className="me-2"
          >
            Not Completed
          </Button>
          <Button
            variant="secondary"
            onClick={() => setFilter('Both')}
            className="me-2"
          >
            Both
          </Button> */}

          <div className="mb-4">
        <select className="form-select" onChange = {(e) => setFilter(e.target.value)}>
            <option value="Both">ALL</option>
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
        </select>
          </div>

        </div>
        <div className="col-md-12">
          {filteredTodos.map((todo, index) => (
            <Card
              key={index}
              className="mb-3"
              bg="light"
              text="dark"
              style={{ width: '18rem', backgroundColor: '#c1f0c1', borderColor: '#28a745'}}
            >
              <Card.Body>
                <Card.Title>{todo.taskName}</Card.Title>
                <Card.Text>{todo.description}</Card.Text>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {todo.status}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusToggle(index)}>
                      {todo.status === 'Not Completed'
                        ? 'Mark as Completed'
                        : 'Mark as Not Completed'}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {editIndex === index ? (
                  <Button
                    variant="primary"
                    onClick={() => handleSaveTodo(index)}
                    className="me-2 mt-2"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => handleEditTodo(index)}
                    className="me-2 mt-2"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteTodo(index)}
                  className="mt-2"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;