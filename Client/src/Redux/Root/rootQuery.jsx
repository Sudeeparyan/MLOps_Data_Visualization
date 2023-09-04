/**
 * Root Query
 *
 * This file exports an object named 'rootQuery' that contains query and mutation hooks related to the ExcelPage component.
 * It includes the 'useLazyGetExcelQuery' and 'useSendExcelCSVMutation' hooks imported from the 'excelRtkQuery' in the 'ExcelPage' directory.
 * These hooks can be used in React components to interact with the Excel API and make queries and mutations.
 */

import {
  useLazyGetExcelQuery,
  useSendExcelCSVMutation,
  useGenerateGraphMutation,
  useGetGraphResultMutation,
  useLazyGetModelsQuery,
} from "../ProjectPage/ProjectRtkQuery";
import { useLazyGetResultDataQuery } from "../GraphPage/graphRtkQuery";

export const rootQuery = {
  excelPage: {
    useLazyGetExcelQuery,
    useSendExcelCSVMutation,
    useGetGraphResultMutation,
    useGenerateGraphMutation,
    useLazyGetModelsQuery,
  },
  graphPage: {
    useLazyGetResultDataQuery,
  },
};
