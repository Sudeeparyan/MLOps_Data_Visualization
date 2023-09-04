/**
 * Root Reducers
 *
 * This file exports an object named 'rootReducers' that contains the Excelreducer to be used as a root reducer in the Redux store.
 * The Excelreducer is imported from the 'excelReducer' in the 'ExcelPage' directory, and it manages Excel-related state in the Redux store.
 */
import Projectreducers from "../ProjectPage/ProjectReducer";
import { ProjectsApi } from "../ProjectPage/ProjectRtkQuery";
import { GraphApi } from "../GraphPage/graphRtkQuery";
import GraphReducer from "../GraphPage/graphReducer";
import Notificationreducers from "../Notification/notificationReducer";

export const rootReducers = {
  ProjectReducer: {
    [ProjectsApi.reducerPath]: ProjectsApi.reducer,
    Excel_Csv: Projectreducers,
    [GraphApi.reducerPath]: GraphApi.reducer,
    Graph_Data: GraphReducer,
    Table_Csv: Projectreducers,
    Notify: Notificationreducers,
  },
};
