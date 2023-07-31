import { useEffect, useState } from 'react';
import { T_todoList, fetchTodo } from '../redux/modules/todo';
import { useAppDispatch } from '../redux/config/configStore';
import { getTodoDB } from '../axios/dbApi';

const useFetchTodoDB = (): void => {
  const [todoDB, setTodoDB] = useState<T_todoList>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const db: T_todoList = (await getTodoDB()).data;
        setTodoDB(db);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (todoDB.length > 0) {
      dispatch(fetchTodo(todoDB));
    }
  }, [todoDB, dispatch]);

  return;
};

export default useFetchTodoDB;
