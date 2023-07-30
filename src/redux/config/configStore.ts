import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../modules/todo';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    todoList: todoSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
