import { BlockItem } from "@/types/utilsTypes/dragAndDrop.types";
import { MenuProps } from "antd";

export const sizeContants = [
    {
        label: "375x667",
        value: "375x667",
    },
    {
        label: "390x844",
        value: "390x844",
    },
    {
        label: "430x932",
        value: "430x932",
    },
    {
        label: "375x812",
        value: "375x812",
    },
    {
        label: "393x851",
        value: "393x851",
    },
    {
        label: "432x915",
        value: "432x915",
    },
];

export const contextMenuItems = (
    allGroups: BlockItem[],
    currentElement: BlockItem
): MenuProps["items"] => {
    const groupMenuItems: MenuProps["items"] = allGroups
        .filter((group) => {
            if (group.type !== "group") return false;
            if (currentElement?.type === "group") return false;
            if (currentElement?.parentId && currentElement.parentId === group.id) return false;
            return true;
        })
        .map((group) => ({
            key: `move_to_${group.id}`,
            label: group.label,
        }));

    const menuItems: MenuProps["items"] = [
        {
            key: "create_and_move",
            label: "Создать группу и переместить",
        },
        {
            key: "copy",
            label: "Копировать",
        },
        {
            key: "delete",
            label: "Удалить",
        },
        {
            key: "rename",
            label: "Переименовать",
        },
    ];

    if (currentElement.type !== "group" && currentElement.parentId) {
        menuItems.push({
            key: "remove_from_group",
            label: "Удалить из группы",
        });
    }

    if (groupMenuItems.length > 0) {
        menuItems.unshift({
            key: "move",
            label: "Добавить в группу",
            children: groupMenuItems,
        });
    }

    return menuItems;
};