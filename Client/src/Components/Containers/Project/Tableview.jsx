//React imports
import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";
//Imports from Reusables
import Table from "../../Reusables/Table/table";
//Import from Styles
import styles from "./project.module.css";
//Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { rootActions } from "../../../Redux/Root/rootActions";
import { rootQuery } from "../../../Redux/Root/rootQuery";
import { projectSelector } from "../../../Redux/Root/rootSelector";
import Loaders from "./loaders";
import FloatingButton from "../../Reusables/FloatingButton/floatButton";
import Sidebar from "./projectSidebar";

/**
 * Tableview component displays a table with project data and controls for generating a graph.
 *
 * @component
 */
const Tableview = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [errorkey, setErrorKey] = useState(false);
  const [open, setOpen] = useState(false);

  const columns = useSelector(projectSelector.tableColumns);
  const tableData = useSelector(projectSelector.tableData);
  const pageNo = useSelector(projectSelector.pageNo);
  const id = useSelector(projectSelector.projectId);

  const [getExcel, getTableData] =
    rootQuery.excelPage.useLazyGetExcelQuery() || {};
  const [getProjects, getData] =
    rootQuery.excelPage.useLazyGetExcelQuery() || {};
  const sheetRef = useRef();
  const [getModels, modelsResponse] =
    rootQuery.excelPage.useLazyGetModelsQuery() || {};

  useEffect(() => {
    // Fetch initial data when component mounts
    const path = location.pathname.split("/")[2];
    getProjects({ projectId: path, pageNo: 1 });
    dispatch(rootActions.projectActions.storeTrainData({ model: 0 }));
    dispatch(rootActions.projectActions.storeTrainX({ x: "" }));
    dispatch(rootActions.projectActions.storeProjectCsv({ delete: true }));
    dispatch(rootActions.projectActions.storeTrainY({ y: "" }));
    dispatch(rootActions.projectActions.storeProjectid({ projectId: path }));
  }, []);

  useEffect(() => {
    if (getTableData.data) {
      if (getTableData.data.error !== null) {
        setErrorKey((prevErrorKey) => !prevErrorKey);
      }
    }
  }, [getTableData.data]);

  const handleScroll = (event) => {
    // Load more data when scrolling to the bottom of the table
    const sheetInstance = sheetRef.current;
    if (
      event.scrollY === sheetInstance.facet.vScrollBar.scrollTargetMaxOffset ||
      0
    ) {
      if (pageNo !== null) {
        getExcel({ projectId: id, pageNo: pageNo });
      }
    }
  };

  const debouncedHandleScroll = debounce(handleScroll, 300);

  const getModelsData = async () => {
    getModels();
  };

  return (
    <div>
      {!errorkey ? (
        <div>
          <div className={styles.loading}>
            {getData.isFetching && tableData.length === 0 ? (
              <Loaders
                loadingText={"Preparing your Preview..."}
                style={styles.loader}
              />
            ) : null}
          </div>
          {getData.isSuccess && tableData.length > 0 ? (
            <div className={styles.mainBox}>
              <div className={styles.table}>
                <Table
                  columns={columns}
                  tableData={tableData}
                  onscroll={debouncedHandleScroll}
                  sheetRef={sheetRef}
                />
              </div>
              <div className={styles.sidebar}>
                <div onClick={getModelsData}>
                  <FloatingButton onclickHandler={setOpen} open={open} />
                </div>
              </div>
              <Sidebar
                open={open}
                setOpen={setOpen}
                modelsResponse={modelsResponse}
              />
            </div>
          ) : null}
          <div className={styles.fetching}>
            {getTableData.status === "pending" ? (
              <Loaders loadingText={"Loading..."} style={styles.fetch} />
            ) : null}
          </div>
        </div>
      ) : (
        <div className={styles.error}>
          <h3>Something went wrong..Please Refresh the page!</h3>
        </div>
      )}
    </div>
  );
};

export default Tableview;
