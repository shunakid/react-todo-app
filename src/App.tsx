import ReactDOM from "react-dom";
import React, { useState, FC } from "react";

type Todos = {
  id: number;
  title: string;
  status: string;
};

const App: FC = () => {
  //Todoリスト全体
  const [todos, setTodos] = useState<Todos[]>([
    { id: 1, title: "todo1", status: "done" },
    { id: 2, title: "todo2", status: "notStarted" },
    { id: 3, title: "todo3", status: "inProgress" },
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
    setTodos([
      ...todos,
      { id: todoId, title: todoTitle, status: "notStarted" },
    ]);
    setTodoId(todoId + 1);
    setTodoTitle("");
  };

  //削除対象以外のtodoを要素としてもつ配列を作成
  const handleDeleteTodo = (targetTodo: Todos) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };

  //該当のtodoの情報にセレクトボックスの状態を上書きした配列を作成
  const handleStatusChange = (targetTodo: Todos, e: any) => {
    const newArray = todos.map((todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
    );
    setTodos(newArray);
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
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(todo, e)}
            >
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
