import { JSX } from "react";
import {
    FaRegSquare,
    FaCheckSquare,
    FaImage,
    FaTextHeight,
    FaClock,
} from "react-icons/fa";
import { BsInputCursor } from "react-icons/bs";
import { RxDropdownMenu } from "react-icons/rx";
import { BsCardText } from "react-icons/bs";
import { RxButton } from "react-icons/rx";
import { BsPlusSlashMinus } from "react-icons/bs";
import { Md123 } from "react-icons/md";
import { PiTabsBold } from "react-icons/pi";
import { FaLayerGroup } from "react-icons/fa";
import { IoIosGrid } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import { FaWpforms } from "react-icons/fa";
import { IoMdSwitch } from "react-icons/io";

export const ComponentLibrary = {
    Button: (props: any) => (
        <button {...props}>{props.text || "Кнопка"}</button>
    ),
    Input: (props: any) => <input {...props} />,
    Image: (props: any) => <img {...props} />,
};

export const blockIcons: Record<string, JSX.Element> = {
    input: <BsInputCursor />,
    textarea: <BsCardText />,
    button: <RxButton />,
    checkbox: <FaCheckSquare />,
    switch: <IoMdSwitch />,
    select: <RxDropdownMenu />,
    text: <FaTextHeight />,
    img: <FaImage />,
    divider: <RxDividerVertical />,
    grid: <IoIosGrid />,
    group: <FaLayerGroup />,
    tab: <PiTabsBold />,
    timer: <FaClock />,
    eventCounter: <BsPlusSlashMinus />,
    form: <FaWpforms />,
    submit: <FaCheckSquare />,
    stepper: <Md123 />,
};
