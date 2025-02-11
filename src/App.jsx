import { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";
import { addNewTodo, fetchTodos } from "./components/store/todoSlice";

function App() {
  const [text, setText] = useState("");
  const { status, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const addTask = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <InputField text={text} handleInput={setText} handleSubmit={addTask} />
        {status === "loading" && <h2>Loading...</h2>}
        {error && <h2>An error occerd: {error}</h2>}
        <TodoList />
      </div>
    </>
  );
}

export default App;
