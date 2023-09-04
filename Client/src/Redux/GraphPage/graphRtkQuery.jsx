import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Networks/baseUrl";
import { endpointsApi } from "../../Networks/endPoints";
import { rootActions } from "../Root/rootActions";

export const GraphApi = createApi({
  reducerPath: "GraphApi",
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
  endpoints: (builder) => ({
    getResultData: builder.query({
      query: ({ projectId, resultId }) =>
        endpointsApi.get_ResultsData + `${projectId}/${resultId}`,
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.error === null) {
            dispatch(rootActions.graphActions.storeResultGraph(data));
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

export const { useLazyGetResultDataQuery } = GraphApi;
