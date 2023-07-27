import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { todoDBStateType, todoDBType } from '../../../types';

const TodoList: React.FC<todoDBStateType> = ({ todoDB, setTodoDB }) => {
  const [confirmToDelete, setConfirmToDelete] = useState<boolean>(false);
  const [deleteModalToggler, setDeleteModalToggler] = useState<
    [boolean, number] | null
  >(null);

  // 수정하기
  const editClickHandler = (id: number): void => {
    const newTodo: string | null | undefined =
      prompt('수정할 값을 입력해주세요.');
    if (!newTodo || todoDB === null) {
      return;
    }
    const targetIndex: number = todoDB.findIndex((todo) => todo.id === id);
    // deepcopy of todoDB
    const copiedDB: todoDBType[] = structuredClone(todoDB);
    copiedDB[targetIndex].todo = newTodo;
    setTodoDB(copiedDB);
  };
  //
  //
  // 삭제 모달 토글러
  const deleteModalToggleHandler = (id: number): void => {
    if (deleteModalToggler && deleteModalToggler[0]) {
      return;
    } else {
      setDeleteModalToggler([true, id]);
    }
  };
  // 삭제 하기
  useEffect(() => {
    if (!confirmToDelete || deleteModalToggler === null || todoDB === null) {
      return;
    }
    const id = deleteModalToggler[1];
    // filteredTodoDB = 해당 todo 값만 뺀 전체 todoDB
    const filteredTodoDB: todoDBType[] = todoDB.filter(
      (todo) => todo.id !== id
    );
    setTodoDB(filteredTodoDB);
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
        {todoDB?.map((todo: todoDBType): JSX.Element => {
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
