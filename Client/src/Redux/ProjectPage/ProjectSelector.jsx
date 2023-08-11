/**
 * Excel Selector
 *
 * This file defines a selector for extracting Excel-related data from the Redux state using the `reselect` library.
 * The selector takes the root state object and retrieves the relevant data from the 'Excel_Csv' slice of the state.
 */

import { createSelector } from "reselect";

const ProjectState = (state) => state.Excel_Csv;

export const Projectselector = {
  projectData: {
    projectId: createSelector([ProjectState], (project) => project.ProjectId),
    tableColumns: createSelector(
      [ProjectState],
      (project) => project.ExcelColumns
    ),
    tableData: createSelector([ProjectState], (project) => project.ExcelCsv),
    error: createSelector([ProjectState], (project) => project.Error),
  },
};
