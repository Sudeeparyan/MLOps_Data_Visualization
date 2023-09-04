/**
 * Excel Selector
 *
 * This file defines a selector for extracting Excel-related data from the Redux state using the `reselect` library.
 * The selector takes the root state object and retrieves the relevant data from the 'Excel_Csv' slice of the state.
 */

import { createSelector } from "reselect";

const ProjectState = (state) => state.Table_Csv;

export const projectId = createSelector(
  [ProjectState],
  (project) => project.ProjectId
);
export const tableColumns = createSelector(
  [ProjectState],
  (project) => project.TableColumns
);
export const tableData = createSelector(
  [ProjectState],
  (project) => project.TableCsv
);
export const pageNo = createSelector([ProjectState], (project) => project.pgNo);

export const bestFit = createSelector(
  [ProjectState],
  (project) => project.BestFit
);
export const actualData = createSelector(
  [ProjectState],
  (project) => project.ActualData
);
export const errorData = createSelector(
  [ProjectState],
  (project) => project.ErrorData
);
export const modelId = createSelector(
  [ProjectState],
  (project) => project.Model_Id
);
export const models = createSelector(
  [ProjectState],
  (project) => project.Models
);
export const selectedModel = createSelector(
  [ProjectState],
  (project) => project.selectedModel
);
export const selectedModelX = createSelector(
  [ProjectState],
  (project) => project.selected_X_Alias
);
export const selectedModelY = createSelector(
  [ProjectState],
  (project) => project.selected_Y_Alias
);
export const Results = createSelector(
  [ProjectState],
  (project) => project.Results
);
export const resultId = createSelector(
  [ProjectState],
  (project) => project.storeResultId
);
export const xLabel = createSelector(
  [ProjectState],
  (project) => project.xLabel
);
export const yLabel = createSelector(
  [ProjectState],
  (project) => project.yLabel
);
