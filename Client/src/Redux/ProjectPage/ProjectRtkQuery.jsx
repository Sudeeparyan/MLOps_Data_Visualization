/**
 * sendExcelCsv API Slice
 *
 * This code defines an API slice for sending and receiving Excel CSV data using Redux Toolkit's createApi.
 * It exports the API slice and custom hooks to be used in React components for making API requests.
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Networks/baseUrl";
import { endpointsApi } from "../../Networks/endPoints";
import { rootActions } from "../Root/rootActions";

export const sendExcelCsv = createApi({
  reducerPath: "SendCsvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  // Define the API endpoints for sending and receiving Excel CSV data
  endpoints: (builder) => ({
    sendExcelCSV: builder.mutation({
      query: (formData) => ({
        url: endpointsApi.send_csv_file_Excel,
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.error === null) {
            dispatch(rootActions.excelActions.storeExcelid(data));
          } else
            dispatch(
              rootActions.notificationActions.storeNotification({
                type: "error",
                message: data.error,
              })
            );
        } catch (err) {
          dispatch(
            rootActions.notificationActions.storeNotification({
              type: "error",
              message: err.error.error,
            })
          );
        }
      },
    }),
    // Query for receiving Excel CSV data from the server based on an 'id'
    getExcel: builder.query({
      query: ({ projectId, pageNo }) =>
        endpointsApi.get_Excel_csv + `${projectId}?page=${pageNo}`,
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.error === null) {
            dispatch(rootActions.excelActions.storeExcelCsv(data));
            dispatch(rootActions.excelActions.storePgno(data.nextPage));
            if (data.nextPage === 2 || data.nextPage === null)
              dispatch(
                rootActions.notificationActions.storeNotification({
                  type: "success",
                  message: "File Loaded Successfully",
                })
              );
          } else
            dispatch(
              rootActions.notificationActions.storeNotification({
                type: "error",
                message: data.error,
              })
            );
        } catch (err) {
          dispatch(
            rootActions.notificationActions.storeNotification({
              type: "error",
              message: err.error.error,
            })
          );
        }
      },
    }),
    generateGraph: builder.mutation({
      query: (id) => ({
        url: endpointsApi.create_model,
        method: "POST",
        body: id,
      }),
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.error === null) {
            dispatch(rootActions.excelActions.storeModelid(data));
          } else
            dispatch(
              rootActions.notificationActions.storeNotification({
                type: "error",
                message: data.error,
              })
            );
        } catch (err) {
          dispatch(
            rootActions.notificationActions.storeNotification({
              type: "error",
              message: err.error.error,
            })
          );
        }
      },
    }),
    getGraphResult: builder.query({
      query: ({ projectId, modelId }) =>
        endpointsApi.get_graph_data + `${projectId}/${modelId}`,
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.error === null) {
            dispatch(rootActions.excelActions.storeGraph(data));
          } else {
            dispatch(
              rootActions.notificationActions.storeNotification({
                type: "error",
                message: data.error,
              })
            );
          }
        } catch (err) {
          dispatch(
            rootActions.notificationActions.storeNotification({
              type: "error",
              message: err.error.error,
            })
          );
        }
      },
    }),
  }),
});

export const {
  useSendExcelCSVMutation,
  useLazyGetExcelQuery,
  useGenerateGraphMutation,
  useLazyGetGraphResultQuery,
} = sendExcelCsv;
