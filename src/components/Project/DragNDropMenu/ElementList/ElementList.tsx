import { Flex, InputNumber, List, Select, Slider, Tooltip } from "antd";
import { FC } from "react";
import classes from "./index.module.scss";
import { blockGroups } from "@/utils/ConstructorItems";
import DraggableItem from "@/UI/DraggableItem/DraggableItem";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DASHBORD_PAGE } from "@/utils/routes";
import classNames from "classnames";
import { ElementListProps } from "../../types";
import { sizeContants } from "../../contants";

const ElementList: FC<ElementListProps> = ({
    scaleValue,
    valueSize,
    handleChangeSizeValue,
    onChangeScale,
}) => {
    return (
        <>
            <div className={classes.segment}>
                <Flex vertical>
                    <Flex align="center" className={classes.main__title}>
                        <Tooltip title="На главную" placement="bottomLeft">
                            <Link
                                className={classes.home__container}
                                to={DASHBORD_PAGE}
                            >
                                <FaHome className={classes.home__icon} />
                            </Link>
                        </Tooltip>
                        <h1
                            className={classNames(
                                classes.segment__title,
                                classes.title
                            )}
                        >
                            Настройки размеров
                        </h1>
                    </Flex>
                    <Select
                        value={valueSize}
                        onChange={(value: string) =>
                            handleChangeSizeValue(value)
                        }
                        placeholder="Выберите размер экрана"
                        className={classes.select}
                        options={sizeContants}
                    />
                    <Flex justify="space-between" className={classes.scale}>
                        <Slider
                            min={1}
                            className={classes.slider}
                            max={200}
                            onChange={onChangeScale}
                            value={
                                typeof scaleValue === "number" ? scaleValue : 0
                            }
                        />
                        <InputNumber
                            min={1}
                            max={200}
                            value={scaleValue}
                            onChange={onChangeScale}
                        />
                    </Flex>
                </Flex>
            </div>
            <List
                dataSource={blockGroups}
                renderItem={(block) => (
                    <Flex className={classes.segment} vertical>
                        <p className={classes.segment__title}>{block.group}</p>
                        <List
                            dataSource={block.blocks}
                            className={classes.segment__content}
                            renderItem={(blockItem) => (
                                <DraggableItem item={blockItem} />
                            )}
                        />
                    </Flex>
                )}
            />
        </>
    );
};

export default ElementList;
