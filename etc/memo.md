## 1. `queryClient.invalidateQueries()` 작동이 안되는 현상

```ts
const mutation = useMutation({
  mutationFn: addTodoDB,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['todoList'],
    });
  },
});
```

### 문제

`onSuccess`에서 `invalidateQueries`가 계속 안되고 막혀서 시간을 허비했다. 심지어 오류메세지가 안 나와서 도통 무엇을 잘못했는지 알지 못했다.

### 해결

모르고 `async` `await`를 쓰지 않아서 그런것이었다.

```ts
const mutation = useMutation({
  mutationFn: addTodoDB,
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ['todoList'],
    });
  },
});
```

---

## 2. `App.tsx`에서 `queryClient`를 초기화해주면 다른 컴포넌트에서 안 해줘야하는건가?

```ts
// App.tsx에서
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});
```

### 궁금증

그런데 여기에서 문제는 1번처럼 `useMutation`에서 `invalidateQueries()`를 쓰기 위해서는 `queryClient`가 있어야하는데, 다시 불러오려면 redux로 queryClient를 따로 스토어에 저장해서 써야하는건가? 아니면 그냥 1번 컴포넌트에서 `const queryClient = new QueryClient()`를 다시 해서 쓰면 되는건가? 일단은 후자로 진행했는데 문제를 발견하지는 못 했다.

### 해결과정

`App.tsx`에서 초기화한 `queryClient` 인스턴스를 콘솔에 찍어보고, 다른 컴포넌트에서 `const queryClient = new QueryClient()`로 새롭게 정의한 `queryClient`를 콘솔에 찍어 서로를 비교해봤다.
그러니 `App.tsx`에서 초기화한 그 `queryClient`가 새롭게 정의한 다른 하위컴포넌트에서도 동일한 `defaultOptions`를 사용하는 것을 확인했고, 결국 같은 것이라고 판단한다.

### 결론

굳이 `App.tsx`(최상위 컴포넌트)에서 정의한 `queryClient`를 프롭스로 내리고 받고, `redux`로 저장하고 말고는 전혀 필요가 없는 부분인것 같다.
