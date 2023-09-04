/**
 * Endpoints API Configuration
 *
 * This file contains a configuration object named 'endpointsApi' that defines various API endpoints used in the application.
 * The object stores the base URL and different endpoint paths as properties, making it easier to manage API URLs throughout the app.
 */
export const endpointsApi = {
  send_csv_file_Excel: "/api/v2/project/upload-file",
  get_Excel_csv: "/api/v2/project/get-file-data/",
  // get_graph_data: "/api/v2/project/test-results", //projectId,modelId
  create_model: "/api/v2/results/fetch-available-results", //projectId
  get_Models: "/api/v2/training-model/get-models",
  get_ResultsData: "/api/v2/results/get-results/", //resultId
  getResultId: "/api/v2/results/generate-results",
};
