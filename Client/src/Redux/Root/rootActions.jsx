/**
 * Root Actions
 *
 * This file exports an object named 'rootActions' that serves as a collection of actions related to Excel data.
 * These actions can be dispatched to update the Redux store with Excel data.
 */

import {
  storeProjectCsv,
  storeProjectid,
  storePgno,
  storeGraph,
  storeModels,
  storeTrainData,
  storeTrainX,
  storeResults,
  storeTrainY,
  storeResultId,
} from "../ProjectPage/ProjectReducer";
import { storeNotification } from "../Notification/notificationReducer";
import { storeResultGraph } from "../GraphPage/graphReducer";

export const rootActions = {
  projectActions: {
    storeProjectCsv,
    storeProjectid,
    storePgno,
    storeGraph,
    storeTrainData,
    storeModels,
    storeTrainX,
    storeResults,
    storeTrainY,
    storeResultId,
  },
  notificationActions: {
    storeNotification,
  },
  graphActions: {
    storeResultGraph,
  },
};
