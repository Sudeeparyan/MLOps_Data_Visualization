import React from "react";
import { SheetComponent } from "@antv/s2-react";
import "@antv/s2-react/dist/style.min.css";
/**
 * A reusable Table component to display tabular data.
 * @param {Array} data - An array of objects representing the table rows and columns.
 * @returns {JSX.Element} - The rendered Table element.
 */
const Table = ({ columns, tableData }) => {
  const dataCfg = {
    fields: {
      columns: columns,
    },
    data: tableData,
  };
  const s2Options = {
    width: 400,
    height: 650,
    interaction: {
      hoverHighlight: true,
      selectedCellsSpotlight: true,
    },
  };

  return (
    <div>
      <SheetComponent
        sheetType="table"
        dataCfg={dataCfg}
        options={s2Options}
        themeCfg={{ name: "colorful" }}
        adaptive={{
          width: true,
          height: true,
        }}
      />
    </div>
  );
};

export default Table;
