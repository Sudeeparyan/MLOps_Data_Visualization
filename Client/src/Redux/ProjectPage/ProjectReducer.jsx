/**
 * Excel Slice
 *
 * This file creates a Redux slice named "excel" to manage Excel-related data in the Redux store.
 * The slice includes the initial state, actions, and a reducer function to update the state based on dispatched actions.
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TableCsv: [],
  TableColumns: [],
  ProjectId: 0,
  pgNo: 1,
  BestFit: [],
  ActualData: [],
  ErrorData: [],
  Models: [],
  selectedModel: 0,
  selected_X_Alias: "",
  selected_Y_Alias: "",
  Results: [],
  storeResultId: 0,
  xLabel: "",
  yLabel: "",
};

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    storeProjectCsv: (state, action) => {
      if (action.payload.delete) state.TableCsv = [];
      else {
        state.TableCsv = [...state.TableCsv, ...action.payload.tableContent];
        state.TableColumns = action.payload.columns;
      }
    },
    storePgno: (state, action) => {
      state.pgNo = action.payload;
    },
    storeProjectid: (state, action) => {
      state.ProjectId = action.payload.projectId;
    },
    storeGraph: (state, action) => {
      state.BestFit = action.payload.bestFitData;
      state.ActualData = action.payload.actualData;
      state.ErrorData = action.payload.errorData;
      state.xLabel = action.payload.xLabel;
      state.yLabel = action.payload.yLabel;
    },
    storeModels: (state, action) => {
      state.Models = action.payload.models;
    },
    storeTrainData: (state, action) => {
      state.selectedModel = action.payload.model;
    },
    storeTrainX: (state, action) => {
      state.selected_X_Alias = action.payload.x;
    },
    storeTrainY: (state, action) => {
      state.selected_Y_Alias = action.payload.y;
    },
    storeResults: (state, action) => {
      console.log(action);
      state.Results = action.payload.results;
    },
    storeResultId: (state, action) => {
      state.storeResultId = action.payload.resultId;
    },
  },
});

export const {
  storeProjectCsv,
  storeProjectid,
  storePgno,
  storeGraph,
  storeModels,
  storeTrainData,
  storeTrainX,
  storeTrainY,
  storeResults,
  storeResultId,
} = ProjectSlice.actions;
export default ProjectSlice.reducer;
