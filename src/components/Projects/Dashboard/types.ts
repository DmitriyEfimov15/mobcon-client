import { RecentProjectsI } from "@/containers/Projects/Dashboard/dasboard.types"
import { FormInstance } from "antd"
import { RcFile } from "antd/es/upload"


export interface DashboardProps {
    isCreateProjectModalOpen: boolean
    form: FormInstance<FormCreateProject>
    recentProjects: RecentProjectsI[]
    handleOpenCreateProjectModal: () => void
    handleCloseCreateProjectModal: () => void
    onFinish: () => void
    setFile: React.Dispatch<React.SetStateAction<RcFile | null>>;
}

export interface FormCreateProject {
    name: string
    description?: string
}