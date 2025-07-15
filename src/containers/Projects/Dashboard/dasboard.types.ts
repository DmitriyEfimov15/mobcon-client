import { RcFile } from "antd/es/upload";

export interface CreateProjectPayload {
    name: string;
    description?: string;
    file?: RcFile | null;
}

export interface RecentProjectsI {
    name: string;
    description?: string;
    id: string;
    icon_url: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface UpdateProjectPayload {
    data: FormData;
    projectId: string;
}

export interface DeleteProjectPayload {
    projectId: string;
}
