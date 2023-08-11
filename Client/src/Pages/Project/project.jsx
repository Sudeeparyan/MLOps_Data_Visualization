/**
 * Project Component
 *
 * The Project component is a React functional component that represents a project page
 * with an Excel table.
 * @returns {JSX.Element} The rendered Project element.
 */

//React Imports
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
//Imports form antD
import { message } from "antd";
//Imports from Reusables
import Table from "../../Components/Reusables/Table/table";
//Redux Imports
import { useSelector } from "react-redux";
import { useLazyGetExcelQuery } from "../../Redux/ProjectPage/ProjectRtkQuery";
import { rootSelector } from "../../Redux/Root/rootSelector";

const Project = () => {
  const columns = useSelector(rootSelector.Project.projectData.tableColumns);
  const tableData = useSelector(rootSelector.Project.projectData.tableData);
  const location = useLocation();
  const [getExcel, resultsExcel] = useLazyGetExcelQuery() || {};
  /**
   * useEffect Hook
   * This hook is used to fetch Excel data based on the current path when the component mounts.
   */
  useEffect(() => {
    const path = location.pathname.split("/")[2];
    getExcel(path);
    if (resultsExcel.data) {
      try {
        if (resultsExcel.data.error !== null)
          message.error(resultsExcel.data.error);
        else message.success("Fetch Success");
      } catch (e) {
        alert("Error:" + e);
      }
    }
  }, [resultsExcel.data]);

  return (
    <div>
      <div>
        <Table columns={columns} tableData={tableData} />
      </div>
    </div>
  );
};

export default Project;
