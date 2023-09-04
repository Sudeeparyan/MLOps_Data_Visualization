import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bestFitX: [],
  bestFitY: [],
  actualX: [],
  actualY: [],
  errorX: [],
  errorY: [],
  toleranceX: [],
  toleranceY: [],
  xLabel: "",
  yLabel: "",
};

const GraphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    storeResultGraph: (state, action) => {
      state.bestFitX = action.payload.bestFitDataX;
      state.bestFitY = action.payload.bestFitDataY;
      state.actualX = action.payload.actualDataX;
      state.actualY = action.payload.actualDataY;
      state.errorX = action.payload.errorDataX;
      state.errorY = action.payload.errorDataY;
      state.toleranceX = action.payload.errorCutoffX;
      state.toleranceY = action.payload.errorCutoffY;
      state.xLabel = action.payload.xLabel;
      state.yLabel = action.payload.yLabel;
    },
  },
});

export const { storeResultGraph } = GraphSlice.actions;
export default GraphSlice.reducer;
