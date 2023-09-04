//React Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//AntD Imports
import { Modal, Button, Input } from "antd";
import { AreaChartOutlined } from "@ant-design/icons";
//Imports from Resusables
import Dropdown from "../../Reusables/Dropdown/dropdown";
//Import from Styles
import styles from "./project.module.css";
//Redux Imports
import { projectSelector } from "../../../Redux/Root/rootSelector";
import { rootActions } from "../../../Redux/Root/rootActions";
import { useSelector, useDispatch } from "react-redux";
import { rootQuery } from "../../../Redux/Root/rootQuery";

/**
 * PopupComponent displays a modal for selecting X and Y axis columns.
 *
 * @component
 * @param {boolean} openmodel - Indicates if the popup modal is open.
 * @param {function} setOpenmodel - Function to toggle the popup modal open/close.
 * @param {string} selectedModel - The selected model.
 */

const PopupComponent = ({ openmodel, setOpenmodel, selectedModel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const models = useSelector(projectSelector.models);
  const trainX = useSelector(projectSelector.selectedModelX);
  const modelId = useSelector(projectSelector.selectedModel);
  const trainY = useSelector(projectSelector.selectedModelY);
  const projectId = useSelector(projectSelector.projectId);
  const columns = useSelector(projectSelector.tableColumns);

  const [xalias, setXAlias] = useState("");
  const [yalias, setYAlias] = useState("");
  const [column, setColumn] = useState(columns);
  const [resultname, setResultname] = useState("");

  const [sendFormula, formulaResponse] =
    rootQuery.excelPage.useGetGraphResultMutation() || {};

  const selectedModelObject = models.find((obj) => obj[selectedModel]);

  useEffect(() => {
    if (selectedModelObject) {
      const { xCoordinate, yCoordinate } = selectedModelObject[selectedModel];
      setXAlias(xCoordinate);
      setYAlias(yCoordinate);
    }
  }, [selectedModel, selectedModelObject]);

  //Refactoring the data from the store to render inside the dropdown
  let columDropdown = [];
  column.forEach((column) => {
    columDropdown.push({
      value: column,
      label: column,
    });
  });

  const storeXColumn = (x) => {
    setxDefaults(x.value);
    setColumn(columns.filter((e) => e !== x.value && e !== trainY));
    dispatch(rootActions.projectActions.storeTrainX({ x: x.value }));
  };
  const storeYColumn = (y) => {
    setyDefaults(y.value);
    setColumn(columns.filter((e) => e !== y.value && e !== trainX));
    dispatch(rootActions.projectActions.storeTrainY({ y: y.value }));
  };

  const handleSubmitDropDown = async () => {
    if (trainX !== "" && trainY !== "") {
      if (resultname.length <= 20) {
        const res = await sendFormula({
          projectId: projectId,
          modelId: modelId,
          xColumn: trainX,
          yColumn: trainY,
          resultName: resultname,
        });
        if (res.data.resultId)
          navigate(
            `/Project/projectId/${projectId}/resultId/${res.data.resultId}`
          );
      } else {
        dispatch(
          rootActions.notificationActions.storeNotification({
            type: "warning",
            message: "Result Name length must be below 20 characters",
          })
        );
      }
    } else
      dispatch(
        rootActions.notificationActions.storeNotification({
          type: "warning",
          message: "Please fill all the Fields Properly",
        })
      );
  };
  const [xdefaults, setxDefaults] = useState("Select Alias X");
  const [ydefaults, setyDefaults] = useState("Select Alias Y");
  const setValue = () => {
    setxDefaults("Select Alias X");
    setyDefaults("Select Alias Y");
    setColumn(columns);
    dispatch(rootActions.projectActions.storeTrainX({ x: "" }));
    dispatch(rootActions.projectActions.storeTrainY({ y: "" }));
  };

  return (
    <>
      <Modal
        title={`Choose the Respective Alias `}
        centered
        afterClose={() => {
          setValue(), setResultname("");
        }}
        open={openmodel}
        onCancel={() => setOpenmodel(false)}
        closable={false}
        bodyStyle={{
          height: 200,
        }}
        footer={[
          <Button info onClick={() => setValue()}>
            Clear Selection
          </Button>,
          <Button
            danger
            onClick={() => {
              setOpenmodel(false);
              setResultname("");
            }}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            loading={formulaResponse.isLoading}
            onClick={handleSubmitDropDown}
          >
            Generate Result
          </Button>,
        ]}
      >
        <div className={styles.popupSeleted}>
          Selected Model :&nbsp;<p>{selectedModel}</p>
        </div>
        <br></br>
        <div className={styles.dropdownParent}>
          <div className={styles.dropDown}>
            {xalias} :{" "}
            <Dropdown
              defaultValue={"None"}
              width={"170px"}
              options={columDropdown}
              handleChange={storeXColumn}
              value={xdefaults}
            />
          </div>
          <br></br>
          <div className={styles.dropDown}>
            {" "}
            {yalias} :{" "}
            <Dropdown
              defaultValue={"None"}
              width={"170px"}
              options={columDropdown}
              handleChange={storeYColumn}
              value={ydefaults}
            />
          </div>
          <br></br>
          <div className={styles.dropDown}>
            {" "}
            Result Name :{" "}
            <Input
              style={{
                height: "30px",
                width: "170px",
              }}
              value={resultname}
              status="none"
              allowClear={true}
              onChange={(e) => setResultname(e.target.value)}
              placeholder="Result Name"
              prefix={<AreaChartOutlined />}
            />
          </div>
        </div>
        <br></br>
      </Modal>
    </>
  );
};

export default PopupComponent;
