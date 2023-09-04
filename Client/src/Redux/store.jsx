/**
 * Redux Store Configuration
 *
 * This file exports a configured Redux store using the '@reduxjs/toolkit' library.
 * The store includes the specified root reducer and middleware for handling API requests using 'sendExcelCsv' middleware.
 */
import { configureStore } from "@reduxjs/toolkit";
import { ProjectsApi } from "./ProjectPage/ProjectRtkQuery";
import { GraphApi } from "./GraphPage/graphRtkQuery";
import { rootReducers } from "./Root/rootReducer";

export const store = configureStore({
  reducer: rootReducers.ProjectReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProjectsApi.middleware, GraphApi.middleware),
});
