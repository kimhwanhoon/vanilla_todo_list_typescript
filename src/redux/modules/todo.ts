import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// T_*: Type of *
export interface T_todo {
  id: string;
  todo: string;
}
export type T_todoState = Array<T_todo>;

const initialState: T_todoState = [];

const todoSlice = createSlice({
  name: 'Todo Slice',
  initialState,
  reducers: {
    fetchTodo: (state: T_todoState, action: PayloadAction<T_todoState>) => {
      return action.payload;
    },
    // modify is used with "post", "edit", "delete" todo (TodoList.tsx)
    updateTodo: (state: T_todoState, action: PayloadAction<T_todoState>) => {
      return action.payload;
    },
  },
});

export default todoSlice;
export const { fetchTodo, updateTodo } = todoSlice.actions;
