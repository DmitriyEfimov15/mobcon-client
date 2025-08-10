import { FC } from "react";
import { ElementTreeProps } from "../../types";
import classes from "@/components/Project/DragNDropMenu/ElementTree/index.module.scss";
import { Empty, Collapse, Dropdown } from "antd";
import {
    FolderOutlined,
    FileTextOutlined,
    FolderOpenOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { contextMenuItems } from "../../contants";
import { useAppDispatch, useAppSelector } from "@/core/hooks/reducers";
import {
    renameElement,
    setCurrentElementId,
    setEditingElementId,
} from "@/store/reducers/elementListReducer";
import AddGroupModal from "./AddGroupModal/AddGroupModal";
import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import { SetEditingElementIdPayload } from "@/store/types/elementListReducer";
import { setNotification } from "@/store/reducers/appReducer";

const { Panel } = Collapse;

const ElementTree: FC<ElementTreeProps> = ({
    parentId = null,
    treeContextMenu,
    isAddGroupModalVisible,
    setTreeMenuContext,
    handleMenuClick,
    setContextId,
    handleCloseAddGroupModal,
}) => {
    const dispatch = useAppDispatch();
    const { currentElementId, allElements } = useAppSelector(
        (state) => state.elementListReducer.present
    );
    const { editingElementId } = useAppSelector(
        (state) => state.elementListReducer.present
    );

    const filtered = allElements.filter((item) => item.parentId === parentId);

    if (filtered.length === 0 && parentId === null) {
        return <Empty description="На рабочем листе нет элементов" />;
    }

    const handleSelect = (id: string) => {
        dispatch(setCurrentElementId(id));
    };

    const handleRenameElement = (
        e: React.FocusEvent<HTMLInputElement, Element>,
        item: BlockItem
    ) => {
        const value = e.target.value;
        if (value === "") {
            dispatch(
                setNotification({
                    statusCode: "400",
                    message:
                        "Название элемента или группы не может быть пустым",
                })
            );
            setTimeout(() => e.target.focus(), 0);
            return;
        }
        const isHasSameName = allElements.find(
            (el) => el.label === value || el.name === value
        );
        if (isHasSameName) {
            dispatch(
                setNotification({
                    statusCode: "400",
                    message: "Такое название уже существует",
                })
            );
            setTimeout(() => e.target.focus(), 0);
            return;
        }

        dispatch(
            renameElement({
                elementId: item.id,
                newName: e.target.value,
            })
        );
        dispatch(setEditingElementId({ editingElementId: null }));
    };

    const onDoubleClickRename = (item: BlockItem) => {
        const payload: SetEditingElementIdPayload = {
            editingElementId: item.id,
        };
        dispatch(setEditingElementId(payload));
    };

    return (
        <div className={classes.tree}>
            {filtered.map((item) => {
                const isGroup = item.type === "group";

                const dropdown = (
                    <Dropdown
                        menu={{
                            items: contextMenuItems(allElements, item),
                            onClick: handleMenuClick,
                        }}
                        trigger={["contextMenu"]}
                        onOpenChange={(open) =>
                            open ? setContextId(item.id) : null
                        }
                    >
                        <div
                            className={
                                isGroup
                                    ? classes.groupHeader
                                    : classNames(classes.element, {
                                          [classes.selected]:
                                              currentElementId === item.id,
                                      })
                            }
                            onClick={
                                isGroup ? () => {} : () => handleSelect(item.id)
                            }
                        >
                            {isGroup ? (
                                <>
                                    {editingElementId === item.id ? (
                                        <input
                                            type="text"
                                            defaultValue={
                                                item.type === "group"
                                                    ? item.label
                                                    : item.name
                                            }
                                            autoFocus
                                            onBlur={(e) =>
                                                handleRenameElement(e, item)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    (
                                                        e.target as HTMLInputElement
                                                    ).blur();
                                                }
                                            }}
                                            className={classes.rename}
                                        />
                                    ) : (
                                        <span
                                            onDoubleClick={() =>
                                                onDoubleClickRename(item)
                                            }
                                        >
                                            {item.label}
                                        </span>
                                    )}
                                </>
                            ) : (
                                <>
                                    <FileTextOutlined
                                        className={classes.icon}
                                    />
                                    {editingElementId === item.id ? (
                                        <input
                                            type="text"
                                            defaultValue={
                                                item.type === "group"
                                                    ? item.label
                                                    : item.name
                                            }
                                            autoFocus
                                            onBlur={(e) =>
                                                handleRenameElement(e, item)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    (
                                                        e.target as HTMLInputElement
                                                    ).blur();
                                                }
                                            }}
                                            className={classes.rename}
                                        />
                                    ) : (
                                        <span
                                            onDoubleClick={() =>
                                                onDoubleClickRename(item)
                                            }
                                        >
                                            {item.name}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    </Dropdown>
                );

                if (isGroup) {
                    return (
                        <Collapse
                            className={classes.group}
                            bordered={false}
                            key={item.id}
                            defaultActiveKey={[]}
                            expandIcon={({ isActive }) =>
                                isActive ? (
                                    <FolderOpenOutlined
                                        className={classes.icon}
                                    />
                                ) : (
                                    <FolderOutlined className={classes.icon} />
                                )
                            }
                        >
                            <Panel header={dropdown} key={item.id}>
                                <div className={classes.children}>
                                    <ElementTree
                                        parentId={item.id}
                                        isAddGroupModalVisible={
                                            isAddGroupModalVisible
                                        }
                                        treeContextMenu={treeContextMenu}
                                        setTreeMenuContext={setTreeMenuContext}
                                        setContextId={setContextId}
                                        handleMenuClick={handleMenuClick}
                                        handleCloseAddGroupModal={
                                            handleCloseAddGroupModal
                                        }
                                    />
                                </div>
                            </Panel>
                        </Collapse>
                    );
                }

                return (
                    <div className={classes.elementWrapper} key={item.id}>
                        {dropdown}
                    </div>
                );
            })}
            <AddGroupModal
                open={isAddGroupModalVisible}
                onClose={handleCloseAddGroupModal}
            />
        </div>
    );
};

export default ElementTree;
