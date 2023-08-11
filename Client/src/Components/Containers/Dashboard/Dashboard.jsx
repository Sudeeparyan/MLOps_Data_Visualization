/**
 * Excel Component
 *
 * The Excel component is a React functional component that represents the Excel page for uploading and processing CSV files.
 * @returns {JSX.Element} The rendered Excel element.
 */

// React Imports
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//Styles
import styles from "./Dashboard.module.css";
// Imports from antD and antV
import { UploadOutlined } from "@ant-design/icons";
import { message } from "antd";
//ReUsables
import UploadButton from "../../Reusables/UploadButton/upploadButton";
//Redux
import { rootSelector } from "../../../Redux/Root/rootSelector";
import { rootQuery } from "../../../Redux/Root/rootQuery";

const Dashboard = () => {
  const navigate = useNavigate();
  const projectId = useSelector(rootSelector.Project.projectData.projectId);
  //Making the upload button diable and enable
  const [disable, setDisable] = useState(false);

  //POST Req RTK Query to send the uploaded csv
  const [sendExcelCSV, resultCsv] =
    rootQuery.excelPage.useSendExcelCSVMutation() || {};
  //GET Req to get the project from Backend
  const [getExcel, resultsExcel] =
    rootQuery.excelPage.useLazyGetExcelQuery() || {};

  /**
   * handleCustomRequest
   *
   * This function is triggered when a CSV file is selected by the user for upload.
   * It sends a POST request to upload the CSV file and a subsequent GET request
   * based on the condition to fetch the project data from the backend.
   *
   * @param {Object} options - Options object containing the uploaded file and error handling.
   */
  const handleCustomRequest = async ({ file, onError }) => {
    try {
      setDisable((prev) => !prev);
      const formData = new FormData();
      formData.append("file", file);
      //sending POST Request
      const res = await sendExcelCSV(formData);
      //sending GET Request based on condition
      if (res.data.error === null) await getExcel(res.data.projectId);
      else {
        setDisable((prev) => !prev);
        onError(message.error("Error Uploading File"));
      }
    } catch (error) {
      setDisable((prev) => !prev);
      onError(message.error("Error Uploading File"));
    }
  };

  //Redirecting the user to another Route when GET Req is Success
  if (resultsExcel.data) {
    navigate(`/Excel/${projectId}`);
  }

  return (
    <div>
      <div className={styles.heading}>
        Upload / Drag and drop the Actual Dataset for Testing
      </div>
      <div className={styles.content}>
        <div>
          <UploadButton
            handleCustomRequest={handleCustomRequest}
            buttonData={"New Project"}
            accept={".csv"}
            work={disable}
            acceptCount={1}
            icon={<UploadOutlined />}
          />
          <br></br>
          {resultCsv.isLoading && (
            <h4 className={styles.upload}>Uploading Please Wait...</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
