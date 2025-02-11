import { useDispatch } from "react-redux";
import { toggleStatus } from "./store/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  return (
    <li key={id}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(deleteTodo(id))} className="delete">
        &times;
      </span>
    </li>
  );
};

export default TodoItem;
