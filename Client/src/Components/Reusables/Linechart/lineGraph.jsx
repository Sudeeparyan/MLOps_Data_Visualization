import React from "react";
//Imports from Nivo Library
import Plot from "react-plotly.js";

/**
 * LineGraph component displays a line chart using Nivo Library.
 *
 * @component
 * @param {Array} bestFit - Data for the "Bestfit" line on the graph.
 * @param {Array} actualData - Data for the "Actual" line on the graph.
 * @param {Array} errorData - Data for the "Error" line on the error graph.
 * @param {boolean} error - Indicates whether the graph is an error graph.
 */

const LineGraph = ({
  bestFitDataX,
  bestFitDataY,
  actualDataX,
  actualDataY,
  errorDataX,
  errorDataY,
  error,
  x,
  y,
  toleranceX,
  toleranceY,
}) => {
  return (
    <div>
      {!error ? (
        <div>
          <Plot
            data={[
              {
                x: actualDataX,
                y: actualDataY,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "blue" },
                name: "Actual",
              },
              {
                x: bestFitDataX,
                y: bestFitDataY,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "orange" },
                name: "BestFit",
              },
            ]}
            layout={{
              width: 1220,
              height: 540,
              title: "Actual Plot",
              xaxis: {
                title: x,
              },
              yaxis: {
                title: y,
              },
            }}
          />
        </div>
      ) : (
        <Plot
          data={[
            {
              x: errorDataX,
              y: errorDataY,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
              name: "Error",
            },
            {
              x: toleranceX,
              y: toleranceY, // Set the y-values to the desired cutoff line value
              mode: "lines",
              fill: "tozeroy",
              type: "scatter",
              name: "Tolerance",
              line: {
                color: "#8FECC8", // Customize the color of the cutoff line
              },
            },
          ]}
          layout={{
            width: 1220,
            height: 540,
            title: "Error Plot",
            xaxis: {
              title: y,
            },
            yaxis: {
              title: "Error",
            },
          }}
        />
      )}
    </div>
  );
};

export default LineGraph;
