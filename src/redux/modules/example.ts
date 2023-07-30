import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ExampleState {
  example: string;
}

const initialState: ExampleState = {
  example: 'write anything',
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    exampleAction: (
      state: ExampleState,
      action: PayloadAction<{ example: string }>
    ) => {
      console.log(action.payload);
      return { ...state, example: action.payload.example };
    },
  },
});

export default exampleSlice;
export const { exampleAction } = exampleSlice.actions;
