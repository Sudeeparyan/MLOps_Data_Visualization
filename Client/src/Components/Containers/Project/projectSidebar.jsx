//React Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupComponent from "./Formula_popup";
//Imports from AntD
import { Drawer, Input, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
//Imrport from Styles
import styles from "./project.module.css";
//Imports from Reusables
import Loader from "../../Reusables/Spinner/loader";
//Imports from Redux
import { projectSelector } from "../../../Redux/Root/rootSelector";
import { useSelector, useDispatch } from "react-redux";
import { rootQuery } from "../../../Redux/Root/rootQuery";
import { rootActions } from "../../../Redux/Root/rootActions";

/**
 * Sidebar component displays a drawer with Models and Results tabs.
 *
 * @component
 * @param {boolean} open - Indicates if the sidebar is open.
 * @param {function} setOpen - Function to toggle the sidebar open/close.
 * @param {Object[]} modelsResponse - Response data for models.
 */

const Sidebar = ({ open, setOpen, modelsResponse }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [model, setModel] = useState(true);
  const [result, setResult] = useState(false);
  const [globeerror, setGlobeerror] = useState(false);
  const [openmodel, setOpenmodel] = useState(false);
  const [modelselected, setModelselected] = useState("");

  const projectId = useSelector(projectSelector.projectId);
  const Results = useSelector(projectSelector.Results);
  const models = useSelector(projectSelector.models);
  //Refactoring the Data from the store
  let transformedData = [];
  transformedData =
    models.length > 0
      ? models.map((obj) => {
          const key = Object.keys(obj)[0];
          const modelId = obj[key].modelId;
          const createdTime = obj[key].createdTime;
          return { name: key, id: modelId, createdTime: createdTime };
        })
      : [];
  const [modeldata, setModelData] = useState(model ? transformedData : Results);
  //Tabs background color switch logics
  const bgColorModel = model ? "rgba(0, 174, 255, 0.753)" : "#F4F7F7";
  const bgColorResult = result ? "rgba(0, 174, 255, 0.753)" : "#F4F7F7";
  const colorModel = model ? "#FFF" : "black";
  const colorResult = result ? "#FFF" : "black";

  const [getResults, getResulstResponse] =
    rootQuery.excelPage.useGenerateGraphMutation() || {};

  //Search logic for Models
  useEffect(() => {
    if (!model) transformedData = Results;
    if (transformedData === undefined) transformedData = [];
    const searchWord = search.trim().toLocaleLowerCase();
    const escapedSearchWord = searchWord.replace(
      /[.*+\-?^${}()|[\]\\]/g,
      "\\$&"
    );
    if (searchWord.length > 0) {
      const filterData =
        transformedData &&
        transformedData.filter(function (data) {
          const regex = new RegExp(escapedSearchWord, "gi");
          return model
            ? data.name.toLowerCase().match(regex)
            : data.resultName.toLowerCase().match(regex);
        });
      setModelData(filterData);
    } else
      setModelData(
        model ? transformedData : Results !== undefined ? Results : []
      );
  }, [search, models]);

  const storeSelectedModel = (model, selected) => {
    dispatch(rootActions.projectActions.storeTrainData({ model: model }));
    setOpenmodel(true);
    setModelselected(selected);
  };
  const getAvailableResults = async () => {
    const res = await getResults({ projectId: projectId });
    if (res.data.results) setModelData(res.data.results);
    if (res.data.details) {
      setModelData([]);
    } else if (res.data.error) {
      setGlobeerror(!globeerror);
      setModelData([]);
    }
  };
  const getResultGraph = (resultId) => {
    dispatch(rootActions.projectActions.storeResultId({ resultId: resultId }));
    navigate(`/Project/projectId/${projectId}/resultId/${resultId}`);
  };

  return (
    <div>
      <div>
        <PopupComponent
          openmodel={openmodel}
          setOpenmodel={setOpenmodel}
          selectedModel={modelselected}
        />
      </div>
      <Drawer
        title={
          model
            ? "Click on the Model for Testing"
            : "Click on any Results to view it"
        }
        width={380}
        closable={true}
        onClose={() => {
          setOpen(!open), setModel(true), setResult(false), setSearch("");
        }}
        open={open}
        style={{
          borderLeft: "5px solid #3AB0FF",
        }}
      >
        <div
          className={styles.tabHeading}
          style={{
            color: colorModel,
          }}
        >
          <div
            className={styles.tab}
            style={{
              backgroundColor: bgColorModel,
            }}
            onClick={() => {
              setModel(true);
              setSearch("");
              setResult(false);
              setModelData(transformedData);
            }}
          >
            Models
          </div>
          <div
            className={styles.tab}
            style={{
              color: colorResult,
              backgroundColor: bgColorResult,
            }}
            onClick={() => {
              setModel(false);
              setResult(true);
              setSearch("");
              getAvailableResults();
            }}
          >
            Results
          </div>
        </div>
        <div className={styles.tabContainer}>
          <div className={styles.modelsContainer}>
            <div className={styles.searchModel}>
              <Input
                placeholder={model ? "Search a model.." : "Search a Result"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                allowClear={true}
                suffix={
                  <Tooltip
                    title={model ? "Search Models" : "Search Results"}
                    color="cyan"
                  >
                    <SearchOutlined />
                  </Tooltip>
                }
                style={{
                  width: 180,
                }}
              />
            </div>
            {globeerror && <p>Error Please Reopen the Sidebar!</p>}
            <div className={styles.modelPop}>
              {modeldata.length === 0 &&
                !getResulstResponse.isLoading &&
                !globeerror && (
                  <div>
                    <b>No Items Found!</b>
                  </div>
                )}
              {(!model && !getResulstResponse.isLoading) ||
              (model &&
                !modelsResponse.isLoading &&
                !modelsResponse.isFetching) ? (
                modeldata !== undefined &&
                modeldata.map((object, index) => (
                  <>
                    <div
                      className={styles.scrollBox}
                      key={index}
                      onClick={
                        model
                          ? () => storeSelectedModel(object.id, object.name)
                          : () => getResultGraph(object.resultId)
                      }
                    >
                      <div> {model ? object.name : object.resultName}</div>
                      <div className={styles.timeStamp}>
                        {object.createdTime}
                      </div>
                    </div>
                    <hr></hr>
                  </>
                ))
              ) : (
                <div className={styles.tabLoaders}>
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
