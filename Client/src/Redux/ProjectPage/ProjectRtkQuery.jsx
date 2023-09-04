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

export const ProjectsApi = createApi({
  reducerPath: "ProjectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Custom-Header", "Header-Value");
    return headers;
  },
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
            dispatch(rootActions.projectActions.storeProjectid(data));
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
            dispatch(rootActions.projectActions.storeProjectCsv(data));
            dispatch(rootActions.projectActions.storePgno(data.nextPage));
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
            if (!data.message)
              dispatch(rootActions.projectActions.storeResults(data));
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

    getGraphResult: builder.mutation({
      query: (resultKey) => ({
        url: endpointsApi.getResultId,
        method: "POST",
        body: resultKey,
      }),
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.error === null) {
            dispatch(rootActions.projectActions.storeResultId(data));
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

    getModels: builder.query({
      query: () => endpointsApi.get_Models,
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.error === null) {
            dispatch(rootActions.projectActions.storeModels(data));
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
  }),
});

export const {
  useSendExcelCSVMutation,
  useLazyGetExcelQuery,
  useGenerateGraphMutation,
  useGetGraphResultMutation,
  useLazyGetModelsQuery,
} = ProjectsApi;
