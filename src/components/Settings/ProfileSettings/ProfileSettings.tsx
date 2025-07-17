import { Divider, Flex, Form } from "antd";
import { FC } from "react";
import { FormEmailI, FormPasswordI, FormUsernameI, ProfileSettingsProps } from "./types";
import FormItem from "antd/es/form/FormItem";
import FloatingLabelInpuBorder from "@/UI/FloatingLabelInputBorder/FloatingLabelInputBorder";
import classes from "./index.module.scss";
import CustomButton from "@/UI/CustomButton/CustomButton";
import classNames from "classnames";
import FloatingLabelPasswordInputBorder from "@/UI/FloatingLabelPasswordInputBorder/FloatingLabelPasswordInputBorder";
import { NotificationPopUp } from "@/UI/NotificationPopUp/NotificationPopUp";
import CancelButton from "@/UI/CancelButton/CancelButton";

const ProfileSettings: FC<ProfileSettingsProps> = ({
    formEmail,
    formPassword,
    formUsername,
    isPasswordUserVisible,
    isChangeUsernameButtonDisabled,
    errorHeader,
    errorMessage,
    errorVisible,
    isPasswordEmailVisible,
    isChangeEmailButtonDisabled,
    isChangingUsernameLoading,
    isChangingEmailLoading,
    successVisible,
    successMessage,
    successTitle,
    isChangingPasswordLoading,
    isChangePasswordButtonDisabled,
    setSuccessVisible,
    setErrorVisible,
    handleValuesUserChange,
    onFinishUsername,
    onFinishEmail,
    handleValuesEmailChange,
    onFinishPassword,
    handleValuesPasswordChange,
    logOutFun,
}) => {
    return (
        <>
            <h1>Настройки пользователя</h1>
            <Flex vertical>
                <Form
                    form={formUsername}
                    className={classes.form}
                    onValuesChange={handleValuesUserChange}
                    onFinish={onFinishUsername}
                >
                    <p>Изменение имени пользователя</p>
                    <FormItem<FormUsernameI>
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Введите имя пользователя",
                            },
                        ]}
                    >
                        <FloatingLabelInpuBorder label="Имя пользователя" />
                    </FormItem>
                    <Form.Item<FormUsernameI>
                        name="password"
                        rules={[{ required: true, message: "Введите пароль" }]}
                        className={classNames(classes.passwordTransition, {
                            [classes.visible]: isPasswordUserVisible,
                        })}
                    >
                        <FloatingLabelPasswordInputBorder
                            label="Подтвердите пароль"
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <CustomButton
                            type="submit"
                            text="Изменить"
                            className={classes.button}
                            isLoading={isChangingUsernameLoading}
                            disabledFlag={isChangeUsernameButtonDisabled}
                        />
                    </Form.Item>
                </Form>
                <Divider />
                <Form form={formEmail} className={classes.form} onFinish={onFinishEmail} onValuesChange={handleValuesEmailChange}>
                    <p>Изменение почты</p>
                    <Form.Item<FormEmailI>
                        name="email"
                        rules={[{ required: true, message: "Введите почту" }]}
                    >
                        <FloatingLabelInpuBorder label="Почта" />
                    </Form.Item>
                    <Form.Item<FormEmailI>
                        name="password"
                        rules={[{ required: true, message: "Введите пароль" }]}
                        className={classNames(classes.passwordTransition, {
                            [classes.visible]: isPasswordEmailVisible,
                        })}
                    >
                        <FloatingLabelPasswordInputBorder
                            label="Подтвердите пароль"
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <CustomButton
                            type="submit"
                            text="Изменить"
                            className={classes.button}
                            isLoading={isChangingEmailLoading}
                            disabledFlag={isChangeEmailButtonDisabled}
                        />
                    </Form.Item>
                </Form>
                <Divider/>
                <Form
                    form={formPassword} 
                    onFinish={onFinishPassword} 
                    onValuesChange={handleValuesPasswordChange}
                    className={classes.form}           
                >
                    <p>Изменение пароля пользователя</p>
                    <Form.Item<FormPasswordI>
                        name="password"
                        rules={[{ required: true, message: "Введите новый пароль" }]}
                        className={classNames(classes.passwordTransition, classes.visible)}
                    >
                        <FloatingLabelPasswordInputBorder
                            label="Введите новый пароль"
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item<FormPasswordI>
                        name="confirmPassword"
                        rules={[{ required: true, message: "Введите старый пароль" }]}
                        className={classNames(classes.passwordTransition, classes.visible)}
                    >
                        <FloatingLabelPasswordInputBorder
                            label="Введите старый пароль"
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <CustomButton
                            type="submit"
                            text="Изменить"
                            className={classes.button}
                            isLoading={isChangingPasswordLoading}
                            disabledFlag={isChangePasswordButtonDisabled}
                        />
                    </Form.Item>
                </Form>
                <Divider/>
                <div className={classes.cancelBtn__container}>
                    <CancelButton onClick={logOutFun} text="Выход из аккаунта"/>
                </div>
            </Flex>
            <NotificationPopUp
                visible={errorVisible}
                setVisible={setErrorVisible}
                title={errorHeader}
                message={errorMessage}
            />
            <NotificationPopUp
                isError={false}
                visible={successVisible}
                setVisible={setSuccessVisible}
                message={successMessage}
                title={successTitle}
            />
        </>
    );
};

export default ProfileSettings;
