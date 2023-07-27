export type todoDBType = {
  id: number;
  todo: string;
};

export type todoDBStateType = {
  todoDB: todoDBType[] | null;
  setTodoDB: React.Dispatch<React.SetStateAction<todoDBType[] | null>>;
};
