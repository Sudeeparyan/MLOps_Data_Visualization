/**
 * A reusable UploadButton component to handle file uploads.
 * @param {function} UploadButton - Callback function triggered on file upload.
 * @returns {JSX.Element} - The rendered UploadButton element.
 */

//React Imports
import React from "react";
//Import Styles
import styles from "./uploadButton.module.css";
//Imports from antD
import { Button, Upload } from "antd";

const UploadButton = ({
  acceptCount,
  work,
  accept,
  handleCustomRequest,
  onchange,
  icon,
  buttonData,
}) => {
  return (
    <div>
      <Upload
        maxCount={acceptCount}
        disabled={work}
        accept={accept}
        customRequest={handleCustomRequest}
        onChange={onchange}
      >
        <Button
          className={styles.uploadButton}
          icon={icon}
          style={{
            height: "70px",
            backgroundColor: "white",
            color: "black",
            fontSize: "17px",
            fontWeight: "bold",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          {buttonData}
        </Button>
      </Upload>
    </div>
  );
};

export default UploadButton;
