import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTodoDB } from '../../axios/dbApi';

// T_*: Type of *
export interface T_todo {
  id: string;
  todo: string;
}
export type T_todoList = Array<T_todo>;

type T_newTodoState = {
  status: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
  };
  data: Array<T_todo>;
};

export const __fetchTodoDB = createAsyncThunk(
  'fetchTodoList',
  async (payload, thunkAPI) => {
    try {
      const res = (await getTodoDB(1)).data;
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: T_newTodoState = {
  status: {
    isLoading: false,
    isError: false,
    error: null,
  },
  data: [],
};

const todoSlice = createSlice({
  name: 'Todo Slice',
  initialState,
  reducers: {
    fetchTodo: (state: T_newTodoState, action: PayloadAction<T_todoList>) => {
      state.data = action.payload;
    },
    // modify is used with "post", "edit", "delete" todo (TodoList.tsx)
    updateTodo: (state: T_newTodoState, action: PayloadAction<T_todoList>) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(__fetchTodoDB.pending, (state, action) => {
        state.status.isLoading = true;
        state.status.isError = false;
        state.status.error = null;
      })
      .addCase(__fetchTodoDB.fulfilled, (state, action) => {
        state.status.isLoading = false;
        state.status.isError = false;
        state.status.error = null;
        state.data = action.payload;
      })
      .addCase(__fetchTodoDB.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.isError = true;
        state.status.error = action.payload;
      });
  },
});

export default todoSlice;
export const { fetchTodo, updateTodo } = todoSlice.actions;
