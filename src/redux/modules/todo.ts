import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// T_*: Type of *
export interface T_todo {
  id: number;
  todo: string;
}
export type T_todoState = Array<T_todo>;

const initialState: T_todoState = [];

const todoSlice = createSlice({
  name: 'Todo Slice',
  initialState,
  reducers: {
    postTodo: (state: T_todoState, action: PayloadAction<T_todo>) => {
      return [...state, action.payload];
    },
    // modify is used with "edit", "delete" todo (TodoList.tsx)
    modifyTodo: (state: T_todoState, action: PayloadAction<T_todoState>) => {
      return action.payload;
    },
  },
});

export default todoSlice;
export const { postTodo, modifyTodo } = todoSlice.actions;
