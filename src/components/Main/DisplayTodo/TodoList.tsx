import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { T_todoList, updateTodo } from '../../../redux/modules/todo';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/config/configStore';
import { deleteTodoDB, editTodoDB } from '../../../axios/dbApi';

const TodoList: React.FC<{}> = () => {
  const [confirmToDelete, setConfirmToDelete] = useState<boolean>(false);
  const [deleteModalToggler, setDeleteModalToggler] = useState<
    [boolean, string] | null
  >(null);
  const storedTodoList: T_todoList = useAppSelector(
    (state) => state.todoList.data
  );

  const dispatch = useAppDispatch();
  // 수정하기
  const editClickHandler = (id: string): void => {
    const newTodo: string | null | undefined =
      prompt('수정할 값을 입력해주세요.');
    if (!newTodo) {
      return;
    }
    const targetIndex: number = storedTodoList.findIndex(
      (todo) => todo.id === id
    );
    // deepcopy of todoDB
    const copiedDB: T_todoList = structuredClone(storedTodoList);
    copiedDB[targetIndex].todo = newTodo;
    editTodoDB({ id, todo: newTodo });
    dispatch(updateTodo(copiedDB));
  };
  //
  //
  // 삭제 모달 토글러
  const deleteModalToggleHandler = (id: string): void => {
    if (deleteModalToggler && deleteModalToggler[0]) {
      return;
    } else {
      setDeleteModalToggler([true, id]);
    }
  };
  // 삭제 하기
  useEffect((): void => {
    if (
      !confirmToDelete ||
      deleteModalToggler === null ||
      storedTodoList === null
    ) {
      return;
    }
    const id = deleteModalToggler[1];
    // filteredTodoDB = 해당 todo 값만 뺀 전체 todoDB
    const filteredTodoList = storedTodoList.filter((el) => el.id !== id);
    deleteTodoDB(id);
    dispatch(updateTodo(filteredTodoList));
    setDeleteModalToggler(null);
    setConfirmToDelete(false);
  }, [confirmToDelete]);

  // 삭제 확인 모달
  const ConfirmToDeleteModal = () => {
    return (
      <DeleteModal>
        <p>정말 삭제하시겠습니까?</p>
        <div>
          <button onClick={() => setConfirmToDelete(true)}>삭제</button>
          <button onClick={() => setDeleteModalToggler(null)}>취소</button>
        </div>
      </DeleteModal>
    );
  };
  return (
    <>
      {deleteModalToggler && <ConfirmToDeleteModal />}
      <TodoListContainerS>
        {storedTodoList.map((todo): JSX.Element => {
          return (
            <TodoContainerS key={todo.id}>
              <TodoContentS>{todo.todo}</TodoContentS>
              <ButtonContainerS>
                <button onClick={() => editClickHandler(todo.id)}>수정</button>
                <button onClick={() => deleteModalToggleHandler(todo.id)}>
                  삭제
                </button>
              </ButtonContainerS>
            </TodoContainerS>
          );
        })}
      </TodoListContainerS>
    </>
  );
};

export default TodoList;

const TodoListContainerS = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
`;

const TodoContainerS = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 1px 3px salmon;
  width: 50%;
  gap: 1rem;
  height: 2rem;
  border-radius: 5px;
  overflow: hidden;
`;

const TodoContentS = styled.p`
  flex: 1 1 auto;
  padding: 0 0.4rem;
  font-size: 0.9rem;
`;

const ButtonContainerS = styled.div`
  display: flex;
  gap: 3px;
  height: 100%;
  & > button {
    cursor: pointer;
  }
`;

const DeleteModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  width: 200px;
  height: 100px;
  border: 1px salmon solid;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  & > div {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.3rem;
    & > * {
      width: 40%;
      padding: 3px;
      cursor: pointer;
    }
  }
`;
