import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { T_todoList } from '../../../redux/modules/todo';
import { deleteTodoDB, editTodoDB, getTodoDB } from '../../../axios/dbApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const TodoList: React.FC<{}> = () => {
  // queryClient 인스턴스 초기화
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ['todoList', pageNumber],
    queryFn: () => getTodoDB(pageNumber),
    keepPreviousData: true,
  });
  //
  // nextPageData받는 로직
  const testData = useQuery({
    queryKey: ['todoList', pageNumber + 1],
    queryFn: () => getTodoDB(pageNumber + 1),
    keepPreviousData: true,
  });
  const nextPageData: Array<T_todoList> = testData?.data?.data;
  //
  const fetchedTodoList: T_todoList = data?.data;

  const [confirmToDelete, setConfirmToDelete] = useState<boolean>(false);
  const [deleteModalToggler, setDeleteModalToggler] = useState<
    [boolean, string] | null
  >(null);

  //
  // 수정하기 query 로직
  const editQuery = useMutation({
    mutationFn: editTodoDB,
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ['todoList'] });
    },
  });
  // 수정하기
  const editClickHandler = (id: string): void => {
    const newTodo: string | null | undefined =
      prompt('수정할 값을 입력해주세요.');
    if (!newTodo) {
      return;
    }
    const targetIndex: number = fetchedTodoList.findIndex(
      (todo) => todo.id === id
    );
    // deepcopy of todoDB
    const copiedDB: T_todoList = structuredClone(fetchedTodoList);
    copiedDB[targetIndex].todo = newTodo;
    // editTodoDB({ id, todo: newTodo });
    editQuery.mutate({ id, todo: newTodo });
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

  // 삭제하기 query 로직
  const deleteQuery = useMutation({
    mutationFn: deleteTodoDB,
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ['todoList'] });
    },
  });
  // 삭제 하기
  useEffect((): void => {
    if (
      !confirmToDelete ||
      deleteModalToggler === null ||
      fetchedTodoList === null
    ) {
      return;
    }
    const id = deleteModalToggler[1];
    deleteQuery.mutate(id);
    setDeleteModalToggler(null);
    setConfirmToDelete(false);
  }, [confirmToDelete, deleteModalToggler, deleteQuery, fetchedTodoList]);

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
        {fetchedTodoList?.map((todo): JSX.Element => {
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
        <PaginationButtons>
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous page
          </button>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={!nextPageData?.length}
          >
            Next page
          </button>
        </PaginationButtons>
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

const PaginationButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
  button {
    cursor: pointer;
  }
`;

const PagesContainer = styled.div`
  display: flex;
  gap: 1rem;
  p {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
