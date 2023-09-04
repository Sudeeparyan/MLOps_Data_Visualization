import { createSelector } from "reselect";

const GraphState = (state) => state.Graph_Data;

export const bestFitX = createSelector([GraphState], (graph) => graph.bestFitX);
export const bestFitY = createSelector([GraphState], (graph) => graph.bestFitY);
export const actualX = createSelector([GraphState], (graph) => graph.actualX);
export const actualY = createSelector([GraphState], (graph) => graph.actualY);
export const errorX = createSelector([GraphState], (graph) => graph.errorX);
export const errorY = createSelector([GraphState], (graph) => graph.errorY);
export const toleranceX = createSelector(
  [GraphState],
  (graph) => graph.toleranceX
);
export const toleranceY = createSelector(
  [GraphState],
  (graph) => graph.toleranceY
);
export const xLabel = createSelector([GraphState], (graph) => graph.xLabel);
export const yLabel = createSelector([GraphState], (graph) => graph.yLabel);
