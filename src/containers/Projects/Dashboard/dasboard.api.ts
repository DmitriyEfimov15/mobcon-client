import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateProjectPayload, DeleteProjectPayload, RecentProjectsI, UpdateProjectPayload } from "./dasboard.types";


export const dasboardApi = createApi({
    reducerPath: 'dasboardApi',
    baseQuery: fetchMainBaseQuery('/projects'),
    endpoints: (builder) => ({
        createProject: builder.mutation<void, FormData>({
            query: (body) => ({
                url: '/create',
                method: 'POST',
                body,
            })
        }),
        getRecentProjects: builder.query<RecentProjectsI[], void>({
            query: () => ({
                url: '/recent',
                method: 'GET'
            })
        }),
        updateProject: builder.mutation<void, UpdateProjectPayload>({
            query: ({projectId, data}) => ({
                url: `/update/${projectId}`,
                method: 'PATCH',
                body: data,
            })
        }),
        deleteProject: builder.mutation<void, DeleteProjectPayload>({
            query: ({projectId}) => ({
                url: `/delete/${projectId}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useCreateProjectMutation,
    useGetRecentProjectsQuery,
    useUpdateProjectMutation,
    useLazyGetRecentProjectsQuery,
    useDeleteProjectMutation,
} = dasboardApi