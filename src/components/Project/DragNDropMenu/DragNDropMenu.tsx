import { FC } from "react";
import classes from "./index.module.scss";
import { DragNDropMenuProps } from "../types";
import ElementList from "./ElementList/ElementList";
import { Tabs, TabsProps } from "antd";
import ElementTree from "./ElementTree/ElementTree";

const DragNDropMenu: FC<DragNDropMenuProps> = ({
    scaleValue,
    valueSize,
    treeContextMenu,
    isAddGroupModalVisible,
    handleMenuClick,
    setTreeMenuContext,
    handleChangeSizeValue,
    onChangeScale,
    setContextId,
    handleCloseAddGroupModal,
}) => {
    const tabs: TabsProps["items"] = [
        {
            key: "1",
            label: "Элементы",
            children: (
                <ElementList
                    valueSize={valueSize}
                    scaleValue={scaleValue}
                    handleChangeSizeValue={handleChangeSizeValue}
                    onChangeScale={onChangeScale}
                />
            ),
        },
        {
            key: "2",
            label: "Древо элементов",
            children: (
                <ElementTree
                    treeContextMenu={treeContextMenu}
                    isAddGroupModalVisible={isAddGroupModalVisible}
                    setTreeMenuContext={setTreeMenuContext}
                    handleMenuClick={handleMenuClick}
                    setContextId={setContextId}
                    handleCloseAddGroupModal={handleCloseAddGroupModal}
                />
            ),
        },
    ];
    return (
        <div className={classes.dragNDrop}>
            <Tabs
                items={tabs}
                defaultActiveKey="1"
                tabBarStyle={{ paddingLeft: 10 }}
            />
        </div>
    );
};

export default DragNDropMenu;
