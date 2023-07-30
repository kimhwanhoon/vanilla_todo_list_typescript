import axios from 'axios';
import { T_todoState } from '../redux/modules/todo';

const requestDB = axios.create({
  baseURL: 'http://localhost:4000',
});

// 데이터 가져오기
export const getTodoDB = async () => {
  return await requestDB('/database');
};

// 데이터 추가하기
export const addTodoDB = async (newData: T_todoState): Promise<void> => {
  await requestDB.post('/database', { todo: newData });
};
