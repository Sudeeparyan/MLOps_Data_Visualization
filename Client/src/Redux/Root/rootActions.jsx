/**
 * Root Actions
 *
 * This file exports an object named 'rootActions' that serves as a collection of actions related to Excel data.
 * These actions can be dispatched to update the Redux store with Excel data.
 */

import {
  storeExcelCsv,
  storeExcelid,
  storePgno,
  storeGraph,
  storeModelid,
} from "../ProjectPage/ProjectReducer";
import { storeNotification } from "../Notification/notificationReducer";

export const rootActions = {
  excelActions: {
    storeExcelCsv,
    storeExcelid,
    storePgno,
    storeGraph,
    storeModelid,
  },
  notificationActions: {
    storeNotification,
  },
};
