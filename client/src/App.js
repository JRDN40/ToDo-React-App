import { useState, useEffect } from 'react';
const API_BASE = "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodos, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = () => {
    fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err))
  }

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id)
      .then((res) => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }
      return todo;
    }))
  }
  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, { method: "DELETE" })
      .then((res) => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }
  return (
    <div className="App">
      <h1>Hallo Jorden</h1>
      <h4>Deine Aufgaben:</h4>
      <div className="todos">
        {todos.map(todo => (
          <div className={"todo " + (todo.complete ? "is-completed" : "")} onClick={() => completeTodo(todo._id)} key={todo._id}>

            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
          </div>
        ))}

      </div>
    </div>
  );
}


export default App;
