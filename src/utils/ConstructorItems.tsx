import { BlockGroup } from "@/types/utilsTypes/dragAndDrop.types";

export const blockGroups: BlockGroup[] = [
    {
        group: "Базовые элементы управления",
        blocks: [
            {
                id: "input",
                type: "input",
                label: "Поле ввода",
                props: {
                    type: "text",
                    placeholder: "Введите текст",
                    disabled: false,
                    required: false,
                    name: "",
                    style: {},
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "textarea",
                type: "textarea",
                label: "Многострочное поле",
                props: {
                    placeholder: "Введите сообщение",
                    value: "",
                    rows: 4,
                    onChange: null,
                    disabled: false,
                    required: false,
                    name: "",
                    style: {},
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "button",
                type: "button",
                label: "Кнопка",
                props: {
                    text: "Нажми меня",
                    onClick: null,
                    disabled: false,
                    type: "button",
                    style: {
                        padding: "12px 20px",
                        backgroundColor: "#007AFF",
                        color: "#ffffff",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                        minWidth: "120px",
                        fontWeight: 500,
                        outline: 'none'
                    },
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "checkbox",
                type: "checkbox",
                label: "Флажок",
                props: {
                    checked: false,
                    onChange: null,
                    name: "",
                    disabled: false,
                    style: {},
                    label: ''
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "switch",
                type: "switch",
                label: "Переключатель",
                props: {
                    name: "group1",
                    checked: false,
                    defaultChecked: false,
                    onChange: null,
                    disabled: false,
                    label: "Вкл/Выкл",
                    className: "",
                    style: {},
                    id: "switch-1",
                    value: "on",
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "select",
                type: "select",
                label: "Выпадающий список",
                props: {
                    value: "",
                    onChange: null,
                    disabled: false,
                    required: false,
                    name: "",
                    style: {},
                    options: [
                        { label: "Опция 1", value: "1" },
                        { label: "Опция 2", value: "2" },
                    ],
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
        ],
    },
    {
        group: "Контент",
        blocks: [
            {
                id: "text",
                type: "text",
                label: "Текст",
                props: {
                    content: "Текст по умолчанию",
                    style: {
                        fontSize: "16px",
                        color: "#111827",
                    },
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "image",
                type: "img",
                label: "Картинка",
                props: {
                    src: "",
                    alt: "Изображение",
                    style: {
                        width: "100%",
                        height: "auto",
                    },
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
        ],
    },
    {
        group: "Разметка",
        blocks: [
            {
                id: "divider",
                type: "divider",
                label: "Разделитель",
                props: {
                    orientation: "horizontal", // 'horizontal' | 'vertical'
                    dashed: false,
                    text: "", // текст в центре разделителя
                    plain: false, // простой стиль
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "grid",
                type: "grid",
                label: "Сетка",
                props: {
                    columns: 2, // количество колонок (например, 2 или 3)
                    gap: 8, // отступ между элементами (px)
                    responsive: false, // адаптивная сетка
                    style: {}, // стили контейнера
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "group",
                type: "group",
                label: "Группа",
                props: {
                    title: "", // заголовок группы
                    bordered: true, // с рамкой или без
                    collapsible: false, // можно ли свернуть группу
                    collapsed: false, // начальное состояние
                    style: {}, // кастомные стили
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "stepper",
                type: "stepper",
                label: "Шаги",
                props: {
                    steps: [
                        {
                            title: "Шаг 1",
                            description: "Описание первого шага",
                        },
                        {
                            title: "Шаг 2",
                            description: "Описание второго шага",
                        },
                    ],
                    currentStep: 0,
                    direction: "horizontal",
                    style: {},
                    onStepChange: null,
                    clickable: true,
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "tab",
                type: "tab",
                label: "Вкладки",
                props: {
                    tabs: [
                        { title: "Вкладка 1", key: "tab1" },
                        { title: "Вкладка 2", key: "tab2" },
                    ],
                    activeKey: "tab1", // активная вкладка по умолчанию
                    type: "line", // "line" | "card" | "editable-card"
                    tabPosition: "top", // "top" | "bottom" | "left" | "right"
                    centered: false,
                    destroyInactiveTabPane: false,
                    style: {},
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
        ],
    },
    {
        group: "Интерактив",
        blocks: [
            {
                id: "timer",
                type: "timer",
                label: "Таймер",
                props: {
                    mode: "countdown", // "countdown" | "stopwatch"
                    initialTime: 60, // стартовое время в секундах
                    autoStart: false, // запускать автоматически
                    format: "mm:ss", // формат отображения времени
                    onFinish: null, // callback при завершении таймера
                    style: {},
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "eventCounter",
                type: "eventCounter",
                label: "Счётчик событий",
                props: {
                    initialCount: 0, // начальное значение счётчика
                    step: 1, // шаг изменения
                    maxCount: null, // максимальное значение (null — без ограничений)
                    minCount: 0, // минимальное значение
                    onChange: null, // callback при изменении счётчика
                    style: {},
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                id: "form",
                type: "form",
                label: "Форма",
                props: {
                    fields: [
                        // поля формы
                        {
                            name: "email",
                            type: "email",
                            placeholder: "Введите email",
                            required: true,
                        },
                        {
                            name: "password",
                            type: "password",
                            placeholder: "Введите пароль",
                            required: true,
                        },
                    ],
                    submitText: "Отправить",
                    onSubmit: null, // callback при отправке формы
                    validationSchema: null, // можно подключить схему валидации (например, Yup)
                    style: {},
                },
                position: {
                    x: 0,
                    y: 0
                }
            },
            // {
            //     id: "submit",
            //     type: "submit",
            //     label: "Кнопка отправки",
            //     props: {
            //         text: "Отправить",
            //         disabled: false,
            //         loading: false,
            //         onClick: null, // callback для обработки отправки (обычно POST запрос)
            //         style: {},
            //     },
            // },
        ],
    },
];
