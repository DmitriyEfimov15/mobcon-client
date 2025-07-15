import { FC } from "react";
import CustomButton from "@/UI/CustomButton/CustomButton";
import * as classes from "./index.module.scss";
import logo from "@/assets/logotextright.jpg";
import { DashboardProps, FormCreateProject } from "./types";
import { Empty, List } from "antd";
import { Link } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import ProjectModal from "@/UI/ProjectModal/ProjectModal";
import RecentProjectCardContainer from "@/containers/Projects/Dashboard/RecentProjectCard/RecentProjectCardContainer";

const Dashboard: FC<DashboardProps> = ({
    isCreateProjectModalOpen,
    form,
    recentProjects,
    handleOpenCreateProjectModal,
    handleCloseCreateProjectModal,
    onFinish,
    setFile,
}) => {
    return (
        <div>
            <div className={classes.logo__info__container}>
                <img src={logo} alt="logoInfo" />
            </div>
            <h1>
                Создавайте мобильные приложения с <span>No-Code</span>
            </h1>
            <p>
                Используйте интуитивно понятные инструменты для создания,
                настройки и публикации собственных мобильных приложений
            </p>
            <CustomButton
                text="Создать проект"
                className={classes.button__start}
                onClick={handleOpenCreateProjectModal}
            />

            <div className={classes.info_block}>
                <div className={classes.round__block}>
                    <CheckOutlined className={classes.check__icon} />
                </div>
                <p className={classes.info__text}>Поддерживает iOS и Android</p>
            </div>

            <div className={classes.recentProjects}>
                <p className={classes.recentProjects__title}>
                    Последние проекты
                </p>
                <List
                    itemLayout="horizontal"
                    className={classes.list}
                    dataSource={recentProjects}
                    locale={{ emptyText: (
                        <div className={classes.no__data}>
                            <Empty description='Нет данных'/>
                        </div>
                    ) }}
                    renderItem={(item) => (
                        <Link to={`/project/${item.id}`}>
                            <RecentProjectCardContainer
                                name={item.name}
                                updatedAt={item.updatedAt}
                                createdAt={item.createdAt}
                                iconUrl={item.icon_url}
                                projectId={item.id}
                                description={item.description}
                            />
                        </Link>
                    )}
                />
            </div>

            <ProjectModal
                form={form}
                isProjectModalOpen={isCreateProjectModalOpen}
                setFile={setFile}
                onFinish={onFinish}
                handleCloseProjectModal={handleCloseCreateProjectModal}
            />
        </div>
    );
};

export default Dashboard;
