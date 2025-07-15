import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IProject } from "./allProjects.types";


export const allProjectsApi = createApi({
    reducerPath: 'allProjectsApi',
    baseQuery: fetchMainBaseQuery('/projects'),
    endpoints: (builder) => ({
        getAllProjects: builder.query<IProject[], void>({
            query: () => ({
                url: '/',
                method: 'GET'
            })
        })
    })
})

export const {
    useGetAllProjectsQuery,
    useLazyGetAllProjectsQuery,
} = allProjectsApi