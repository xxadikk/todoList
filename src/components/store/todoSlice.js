import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (!response.ok) {
        throw new Error("Сервер не работает!");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}/`,
        { method: "DELETE" }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Can't delete task. Server error.");
      }
      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/togglestatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Can\t toggle status. Server error.");
      }
      dispatch(toggleTodoComplete({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todo/addNewTodo",
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) {
        throw new Error("Can\t toggle status. Server error.");
      }

      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggledTodo.completed = !toggleTodoComplete.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "resolved";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, setError)
      .addCase(deleteTodo.rejected, setError)
      .addCase(toggleStatus.rejected, setError);
  },
});

const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
