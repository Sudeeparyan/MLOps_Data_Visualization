import React from "react";
import { SheetComponent } from "@antv/s2-react";
import "@antv/s2-react/dist/style.min.css";
/**
 * A reusable Table component to display tabular data.
 * @param {Array} data - An array of objects representing the table rows and columns.
 * @returns {JSX.Element} - The rendered Table element.
 */
const Table = ({ columns, tableData, onscroll, sheetRef }) => {
  const dataCfg = {
    fields: {
      columns: columns,
    },
    data: tableData,
  };

  const s2Options = {
    width: 1000,
    height: 600,
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
        ref={sheetRef}
        options={s2Options}
        themeCfg={{ name: "colorful" }}
        onScroll={onscroll}
      />
    </div>
  );
};

export default Table;
