/**
 * Endpoints API Configuration
 *
 * This file contains a configuration object named 'endpointsApi' that defines various API endpoints used in the application.
 * The object stores the base URL and different endpoint paths as properties, making it easier to manage API URLs throughout the app.
 */
export const endpointsApi = {
  send_csv_file_Excel: "/api/v2/project/upload-csv",
  get_Excel_csv: "/api/v2/project/get-csv/",
  get_graph_data: "/api/v2/project/get-results/",
  create_model: "/api/v2/project/test-data",
};
