/**
 * Root Reducers
 *
 * This file exports an object named 'rootReducers' that contains the Excelreducer to be used as a root reducer in the Redux store.
 * The Excelreducer is imported from the 'excelReducer' in the 'ExcelPage' directory, and it manages Excel-related state in the Redux store.
 */
import Projectreducers from "../ProjectPage/ProjectReducer";
import { sendExcelCsv } from "../ProjectPage/ProjectRtkQuery";

export const rootReducers = {
  ProjectReducer: {
    [sendExcelCsv.reducerPath]: sendExcelCsv.reducer,
    Excel_Csv: Projectreducers,
  },
};
