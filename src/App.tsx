import ReactDOM from "react-dom";
import React from "react";

type User = {
  id: number;
  title: string;
};

const App = () => {
  const todos: Array<User> = [
    { id: 1, title: "todo1" },
    { id: 2, title: "todo2" },
    { id: 3, title: "todo3" },
  ];

  return (
    <>
      <div>
        <input type="text" />
        <button>作成</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
