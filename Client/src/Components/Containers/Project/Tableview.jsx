//React imports
import React, { useEffect, useRef } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
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
import ButtonComponent from "../../Reusables/Button/Button";
/**
 * Tableview component displays a table with project data and controls for generating a graph.
 *
 * @component
 */
const Tableview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const columns = useSelector(projectSelector.tableColumns);
  const tableData = useSelector(projectSelector.tableData);
  const projectId = useSelector(projectSelector.projectId);
  const pageNo = useSelector(projectSelector.pageNo);
  const id = useSelector(projectSelector.projectId);

  const [getExcel, getTableData] =
    rootQuery.excelPage.useLazyGetExcelQuery() || {};
  const [getProjects, getData] =
    rootQuery.excelPage.useLazyGetExcelQuery() || {};
  const [sendProject, getProject] =
    rootQuery.excelPage.useGenerateGraphMutation() || {};

  const sheetRef = useRef();

  useEffect(() => {
    // Fetch initial data when component mounts
    const path = location.pathname.split("/")[2];
    getProjects({ projectId: path, pageNo: 1 });
    dispatch(rootActions.excelActions.storeExcelid({ projectId: path }));
  }, []);

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

  const genarateGraph = async () => {
    // Generate a graph based on the selected project
    const res = await sendProject({ projectId: id });
    navigate(`/Project/${projectId}/${res.data.modelId}`);
  };

  return (
    <div>
      <div className={styles.loading}>
        {getData.isFetching && (
          <Loaders
            loadingText={"Preparing your Preview..."}
            style={styles.loader}
          />
        )}
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
            <div>
              <ButtonComponent
                content={"Generate Graph"}
                onclick={genarateGraph}
                loading={getProject.isLoading || getProject.isFetching}
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.fetching}>
        {getTableData.status === "pending" ? (
          <Loaders loadingText={"Loading..."} style={styles.fetch} />
        ) : null}
      </div>
    </div>
  );
};

export default Tableview;
