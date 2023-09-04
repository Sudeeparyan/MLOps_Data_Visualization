//React Imports
import React, { useEffect } from "react";
//Imports from Reusables
import SpinLoader from "../../Reusables/SpinLoader/spinLoader";
import LineGraph from "../../Reusables/Linechart/lineGraph";
//Redux Imports
import { rootQuery } from "../../../Redux/Root/rootQuery";
import { useSelector } from "react-redux";
import { graphSelector } from "../../../Redux/Root/rootSelector";
//Styles
import styles from "./graph.module.css";
// import ButtonComponent from "../../Reusables/Button/Button";
/**
 * Graph component displays two types of graphs: actual graph and error graph.
 *
 * @component
 */
const Graph = () => {
  const [showGraph, getGraph] =
    rootQuery.graphPage.useLazyGetResultDataQuery() || {};

  const bestFitX = useSelector(graphSelector.bestFitX);
  const bestFitY = useSelector(graphSelector.bestFitY);
  const actualX = useSelector(graphSelector.actualX);
  const actualY = useSelector(graphSelector.actualY);
  const errorX = useSelector(graphSelector.errorX);
  const errorY = useSelector(graphSelector.errorY);
  const toleranceX = useSelector(graphSelector.toleranceX);
  const toleranceY = useSelector(graphSelector.toleranceY);
  const xLabel = useSelector(graphSelector.xLabel);
  const yLabel = useSelector(graphSelector.yLabel);

  useEffect(() => {
    const projectId = location.pathname.split("/")[3];
    const resultId = location.pathname.split("/")[5];
    showGraph({ resultId: resultId, projectId: projectId });
  }, []);

  return (
    <div>
      <div className={styles.graphBox}>
        <div className={styles.graphContainer}>
          <div className={styles.heading}>Actual Graph</div>
        </div>
        <div className={styles.box}>
          {getGraph.isSuccess &&
          getGraph.data.error === null &&
          !getGraph.isFetching ? (
            <div className={styles.graph}>
              <br></br>
              <LineGraph
                bestFitDataX={bestFitX}
                bestFitDataY={bestFitY}
                actualDataX={actualX}
                actualDataY={actualY}
                toleranceX={[]}
                toleranceY={[]}
                errorCutoff={[]}
                error={false}
                x={xLabel}
                y={yLabel}
              />
            </div>
          ) : null}
          {getGraph.isLoading || getGraph.isFetching ? (
            <div>
              <SpinLoader />
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.graphBox}>
        <div className={styles.graphContainer}>
          <div className={styles.heading}>Error Graph</div>
        </div>
        <br></br>
        <div className={styles.box}>
          {getGraph.isSuccess &&
          getGraph.data.error === null &&
          !getGraph.isFetching ? (
            <div className={styles.graph}>
              <LineGraph
                bestFit={[]}
                actualData={[]}
                errorDataX={errorX}
                errorDataY={errorY}
                toleranceX={toleranceX}
                toleranceY={toleranceY}
                error={true}
                x={xLabel}
                y={yLabel}
              />
            </div>
          ) : null}
          {getGraph.isLoading || getGraph.isFetching ? (
            <div>
              <SpinLoader />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Graph;
