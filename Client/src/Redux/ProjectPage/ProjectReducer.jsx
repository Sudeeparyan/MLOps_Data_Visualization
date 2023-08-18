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
  pgNo: 1,
  BestFit: [],
  ActualData: [],
  ErrorData: [],
  Model_Id: 0,
};

const ExcelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    storeExcelCsv: (state, action) => {
      if (action.payload.delete) state.ExcelCsv = [];
      state.ExcelCsv = [...state.ExcelCsv, ...action.payload.tableContent];
      state.ExcelColumns = action.payload.columns;
    },
    storePgno: (state, action) => {
      state.pgNo = action.payload;
    },
    storeExcelid: (state, action) => {
      state.ProjectId = action.payload.projectId;
    },
    storeGraph: (state, action) => {
      state.BestFit = action.payload.bestFitData;
      state.ActualData = action.payload.actualData;
      state.ErrorData = action.payload.errorData;
    },
    storeModelid: (state, action) => {
      state.Model_Id = action.payload.modelId;
    },
  },
});

export const {
  storeExcelCsv,
  storeExcelid,
  storePgno,
  storeGraph,
  storeModelid,
} = ExcelSlice.actions;
export default ExcelSlice.reducer;
