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

  //個別のtodoのid
  const [todoId, setTodoId] = useState(todos.length + 1);

  //タイトル欄の入力値が変化する度にstateを更新
  const handleAddFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  //追加ボタンが押されると新しいtodoをTodoリストに追加する
  const handleAddTodo = () => {
    setTodos([...todos, { id: todoId, title: todoTitle }]);
    setTodoId(todoId + 1);
    setTodoTitle("");
  };

  //削除対象以外のtodoを要素としてもつ配列を作成
  const handleDeleteTodo = (targetTodo: Todos) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="タイトル"
          value={todoTitle}
          onChange={handleAddFormChanges}
        />
        <button onClick={handleAddTodo}>追加</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
