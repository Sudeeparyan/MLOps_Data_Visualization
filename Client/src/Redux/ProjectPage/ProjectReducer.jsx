/**
 * Excel Slice
 *
 * This file creates a Redux slice named "excel" to manage Excel-related data in the Redux store.
 * The slice includes the initial state, actions, and a reducer function to update the state based on dispatched actions.
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ExcelCsv: [],
  ExcelColumns: [],
  ProjectId: 0,
  Error: null,
};

const ExcelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    storeExcelCsv: (state, action) => {
      state.ExcelCsv = action.payload.tableContent;
      state.ExcelColumns = action.payload.columns;
      state.Error = action.payload.error;
    },
    storeExcelid: (state, action) => {
      state.ProjectId = action.payload.projectId;
      state.Error = action.payload.error;
    },
  },
});

export const { storeExcelCsv, storeExcelid } = ExcelSlice.actions;
export default ExcelSlice.reducer;
