import ReactDOM from "react-dom";
import React, { useState, useEffect, FC } from "react";

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

  //タイトル
  const [todoTitle, setTodoTitle] = useState("");

  //id
  const [todoId, setTodoId] = useState(todos.length + 1);

  //編集画面
  const [isEditable, setIsEditable] = useState(false);

  //編集したいtodoのid
  const [editId, setEditId] = useState<string | number>("");

  //新しいタイトル
  const [newTitle, setNewTitle] = useState("");

  //フィルター
  const [filter, setFilter] = useState("notStarted");

  //フィルターの選択値
  const [filteredTodos, setFilteredTodos] = useState<Todos[]>([]);

  //タイトルの入力値が変化する度にstateを更新
  const handleAddFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  //新しいタイトルの入力値が変化する度にstateを更新
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  //[追加ボタン]新しいtodoをTodoリストに追加する
  const handleAddTodo = () => {
    setTodos([
      ...todos,
      { id: todoId, title: todoTitle, status: "notStarted" },
    ]);
    setTodoId(todoId + 1);
    setTodoTitle("");
  };

  //[編集ボタン]押されると画面が切り替わる
  const handleOpenEditForm = (todo: Todos) => {
    setIsEditable(true);
    setEditId(todo.id);
    setNewTitle(todo.title);
  };

  //[編集を保存ボタン]編集内容をTodoリストの配列に加える
  const handleEditTodo = () => {
    const newArray = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: newTitle } : todo
    );
    setTodos(newArray);
    setNewTitle("");
    setEditId("");
    handleCloseEditForm();
    //
  };

  //[キャンセルボタン]押されると画面が切り替わる
  const handleCloseEditForm = () => {
    setIsEditable(false);
    setEditId("");
  };

  //[削除ボタン]削除対象以外のtodoを要素としてもつ配列を作成
  const handleDeleteTodo = (targetTodo: Todos) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };

  //[セレクトボックス]該当のtodoの情報にセレクトボックスの状態を上書きした配列を作成
  const handleStatusChange = (targetTodo: Todos, e: any) => {
    const newArray = todos.map((todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
    );
    setTodos(newArray);
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "notStarted":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "notStarted")
          );
          break;
        case "inProgress":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "inProgress")
          );
          break;
        case "done":
          setFilteredTodos(todos.filter((todo) => todo.status === "done"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  return (
    <>
      {isEditable ? (
        <div>
          <input
            type="text"
            placeholder="新しいタイトル"
            value={newTitle}
            onChange={handleEditFormChange}
          />
          <button onClick={handleEditTodo}>編集を保存</button>
          <button onClick={handleCloseEditForm}>キャンセル</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="タイトル"
            value={todoTitle}
            onChange={handleAddFormChanges}
          />
          <button onClick={handleAddTodo}>追加</button>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">すべて</option>
            <option value="notStarted">未着手</option>
            <option value="inProgress">作業中</option>
            <option value="done">完了</option>
          </select>
        </div>
      )}

      <ul>
        {filteredTodos.map((todo) => (
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
            <button onClick={() => handleOpenEditForm(todo)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
