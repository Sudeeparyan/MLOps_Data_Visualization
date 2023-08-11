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

const UploadButton = (props) => {
  return (
    <div>
      <Upload
        maxCount={props.acceptCount}
        disabled={props.work}
        accept={props.accept}
        customRequest={props.handleCustomRequest}
      >
        <Button
          className={styles.uploadButton}
          icon={props.icon ? props.icon : null}
        >
          {props.buttonData}
        </Button>
      </Upload>
    </div>
  );
};

export default UploadButton;
