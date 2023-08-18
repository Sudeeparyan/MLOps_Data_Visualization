//React Imports
import React from "react";
//Imports from Nivo Library
import { Line } from "@nivo/line";
/**
 * LineGraph component displays a line chart using Nivo Library.
 *
 * @component
 * @param {Array} bestFit - Data for the "Bestfit" line on the graph.
 * @param {Array} actualData - Data for the "Actual" line on the graph.
 * @param {Array} errorData - Data for the "Error" line on the error graph.
 * @param {boolean} error - Indicates whether the graph is an error graph.
 */

const LineGraph = ({ bestFit, actualData, errorData, error, scatter }) => {
  const data = [
    {
      id: "Actual",
      data: actualData,
    },
    {
      id: "Bestfit",
      data: bestFit,
    },
  ];
  const Edata = [
    {
      id: "Error",
      data: errorData,
    },
  ];

  const zoom = (e) => {
    console.log(e);
  };

  return (
    <div>
      {!error ? (
        <div>
          <Line
            data={data}
            margin={{ top: 20, right: 30, bottom: 40, left: 100 }}
            xScale={{ type: "linear", min: "auto", max: "auto" }}
            yScale={{ type: "linear", min: "auto", max: "auto" }}
            curve="natural"
            width={1200}
            height={500}
            yFormat=" >-.2f"
            enablePoints={true}
            enableGridX={true}
            pointSize={7}
            pointBorderWidth={2}
            pointBorderColor={"white"}
            lineWidth={scatter ? 0 : 1}
            enableGridY={true}
            enableCrosshair={true}
            crosshairType="top-right"
            enableSlices="x"
            onMouseMove={zoom}
            colors={["#5B70F3", "#F0A500"]}
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                justify: false,
                translateX: -100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 100,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      ) : (
        <div>
          <Line
            data={Edata}
            margin={{ top: 20, right: 30, bottom: 40, left: 100 }}
            xScale={{ type: "linear", min: "auto", max: "auto" }}
            yScale={{ type: "linear", min: "auto", max: "auto" }}
            curve="natural"
            width={1200}
            height={500}
            yFormat=" >-.2f"
            enablePoints={true}
            enableGridX={true}
            enableGridY={true}
            pointSize={7}
            pointBorderWidth={2}
            pointBorderColor={"white"}
            lineWidth={scatter ? 0 : 1}
            enableSlices="x"
            enableCrosshair={true}
            colors={["#F35C6E"]}
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                justify: false,
                translateX: -100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 100,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default LineGraph;
