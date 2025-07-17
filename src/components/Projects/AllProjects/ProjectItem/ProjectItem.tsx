import ConfirmModal from "@/UI/ConfirmModal/ConfirmModal";
import ProjectModal from "@/UI/ProjectModal/ProjectModal";
import { DeleteOutlined, EditOutlined, ToolOutlined } from "@ant-design/icons";
import classes from "./index.module.scss";
import noIcon from "@/assets/no-icon.jpg";
import { FC } from "react";
import { FormInstance } from "antd";
import { FormCreateProject } from "../../Dashboard/types";
import { RcFile } from "antd/es/upload";

interface ProjectItemProps {
    form: FormInstance<FormCreateProject>;
    name: string;
    description?: string;
    icon_url?: string;
    isProjectModalOpen: boolean;
    isDeleteConfirmOpen: boolean;
    startFun: () => void;
    editFun: () => void;
    deleteFun: () => void;
    handleCloseEditProjectModal: () => void;
    handleCloseDelete: () => void;
    onFinishEdit: () => void;
    setFile: React.Dispatch<React.SetStateAction<RcFile | null>>;
    handleDeleteProject: () => void;
}

const ProjectItem: FC<ProjectItemProps> = ({
    form,
    name,
    description,
    icon_url,
    isProjectModalOpen,
    isDeleteConfirmOpen,
    startFun,
    editFun,
    deleteFun,
    handleCloseEditProjectModal,
    handleCloseDelete,
    onFinishEdit,
    setFile,
    handleDeleteProject,
}) => {
    return (
        <div className={classes.container}>
            <div className={classes.info}>
                <div className={classes.img}>
                    <img
                        src={
                            icon_url
                                ? `${import.meta.env.VITE_API_URL}/${icon_url}`
                                : noIcon
                        }
                        alt="Иконка"
                    />
                </div>
                <div className={classes.text}>
                    <p className={classes.name}>{name}</p>
                    <p className={classes.description}>{description}</p>
                </div>
            </div>

            <div className={classes.action__container}>
                <div className={classes.action} onClick={startFun}>
                    <ToolOutlined className={classes.start} />
                </div>
                <div className={classes.action} onClick={editFun}>
                    <EditOutlined className={classes.edit} />
                </div>
                <div className={classes.action} onClick={deleteFun}>
                    <DeleteOutlined className={classes.delete} />
                </div>
            </div>

            <ProjectModal
                isEdit={true}
                form={form}
                isProjectModalOpen={isProjectModalOpen}
                initialImageUrl={icon_url}
                handleCloseProjectModal={handleCloseEditProjectModal}
                onFinish={onFinishEdit}
                setFile={setFile}
            />

            <ConfirmModal
                title="Удаление"
                message={`Вы уверены, что хотите удалить проект "${name}" ?`}
                isOpen={isDeleteConfirmOpen}
                handleClose={handleCloseDelete}
                confirm={handleDeleteProject}
            />
        </div>
    );
};

export default ProjectItem;
