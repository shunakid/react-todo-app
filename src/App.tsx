import ReactDOM from "react-dom";
import React, { useState, FC } from "react";

type Todos = {
  id: number;
  title: string;
};

const App: FC = () => {
  //Todoリスト全体
  const [todos, setTodos] = useState<Todos[]>([
    { id: 1, title: "todo1" },
    { id: 2, title: "todo2" },
    { id: 3, title: "todo3" },
  ]);

  //個別のTodo
  const [todoTitle, setTodoTitle] = useState("");

  const handleAddFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  return (
    <>
      <div>
        <input type="text" value={todoTitle} onChange={handleAddFormChanges} />
        <button>追加</button>
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
