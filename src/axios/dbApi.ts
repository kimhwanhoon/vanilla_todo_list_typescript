import axios from 'axios';
import { T_todo, T_todoState } from '../redux/modules/todo';

const requestDB = axios.create({
  baseURL: 'http://localhost:4000',
});

// 데이터 가져오기
export const getTodoDB = async () => {
  return await requestDB('/database');
};

// 데이터 추가하기
export const addTodoDB = async (newData: T_todo): Promise<void> => {
  await requestDB.post('/database', newData);
};

// 데이터 삭제하기
export const deleteTodoDB = async (id: string): Promise<void> => {
  await requestDB.delete(`/database/${id}`);
};

// 데이터 수정하기
export const editTodoDB = async (newData: T_todo): Promise<void> => {
  await requestDB.patch(`/database/${newData.id}`, newData);
};
