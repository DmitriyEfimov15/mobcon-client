import ProfileSettings from "@/components/Settings/ProfileSettings/ProfileSettings";
import {
    FormEmailI,
    FormPasswordI,
    FormUsernameI,
} from "@/components/Settings/ProfileSettings/types";
import { useAppDispatch, useAppSelector } from "@/core/hooks/reducers";
import {
    changeEmailRequest,
    changePassword,
    changeUsername,
    logout,
} from "@/store/actions/AuthAction";
import { useForm } from "antd/es/form/Form";
import { FC, useEffect, useState } from "react";

const ProfileSettingsContainer: FC = () => {
    const [formUsername] = useForm();
    const [formEmail] = useForm();
    const [formPassword] = useForm();
    const [isPasswordUserVisible, setIsPasswordUserVisible] = useState(false);
    const [isChangeUsernameButtonDisabled, setIsChangeUsernameButtonDisabled] =
        useState<boolean>(true);
    const [errorVisible, setErrorVisible] = useState<boolean>(false);
    const [errorHeader, setErrorHeader] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [successTitle, setSuccessTitle] = useState<string>("");
    const [successVisible, setSuccessVisible] = useState<boolean>(false);
    const [isChangeEmailButtonDisabled, setIsChangeEmailButtonDisabled] =
        useState<boolean>(true);
    const [isPasswordEmailVisible, setIsPasswordEmailVisible] = useState(false);
    const [isChangePasswordButtonDisabled, setIsChangePasswordButtonDisabled] =
        useState<boolean>(true);

    const dispatch = useAppDispatch();

    const {
        user,
        error,
        isChangingEmailLoading,
        isChangingUsernameLoading,
        isChangingPasswordLoading,
    } = useAppSelector((state) => state.authReducer);

    const handleValuesUserChange = (changedValues: Partial<FormUsernameI>) => {
        if (
            changedValues.username &&
            changedValues.username !== user.username
        ) {
            setIsPasswordUserVisible(true);
            setIsChangeUsernameButtonDisabled(false);
        } else if (
            changedValues.username === "" ||
            changedValues.username === user.username
        ) {
            setIsChangeUsernameButtonDisabled(true);
            setIsPasswordUserVisible(false);
            formUsername.setFieldValue("password", "");
        }
    };

    useEffect(() => {
        if (user.username)
            formUsername.setFieldValue("username", user.username);
        if (user.email) formEmail.setFieldValue("email", user.email);
    }, [user]);

    const onFinishUsername = async () => {
        await formUsername.validateFields();
        const values = formUsername.getFieldsValue();
        const response = await dispatch(
            changeUsername(values.username, values.password)
        );

        if (response) {
            formUsername.setFieldValue("password", "");
            setIsChangeUsernameButtonDisabled(true);
            setIsPasswordUserVisible(false);
        }
    };

    const handleValuesEmailChange = (changedValues: Partial<FormEmailI>) => {
        if (changedValues.email && changedValues.email !== user.email) {
            setIsPasswordEmailVisible(true);
            setIsChangeEmailButtonDisabled(false);
        } else if (
            changedValues.email === "" ||
            changedValues.email === user.email
        ) {
            setIsChangeEmailButtonDisabled(true);
            setIsPasswordEmailVisible(false);
            formUsername.setFieldValue("password", "");
        }
    };

    const onFinishEmail = async () => {
        await formEmail.validateFields();
        const values = formEmail.getFieldsValue();

        const response = await dispatch(
            changeEmailRequest(values.email, values.password)
        );

        if (response) {
            setSuccessTitle("Успешно");
            setSuccessMessage("На вашу нынешнюю почту отправлено письмо!");
            return setSuccessVisible(true);
        }
    };

    const handleValuesPasswordChange = (
        changedValues: Partial<FormPasswordI>,
        allValues: FormPasswordI
      ) => {
        const { password, confirmPassword } = allValues;
      
        const isPasswordFilled = password?.trim().length > 0;
        const isConfirmFilled = confirmPassword?.trim().length > 0;
      
        setIsChangePasswordButtonDisabled(!(isPasswordFilled && isConfirmFilled));
      };

    const onFinishPassword = async () => {
        await formPassword.validateFields();
        const values = formPassword.getFieldsValue();

        const response = await dispatch(
            changePassword(values.password, values.confirmPassword)
        );

        if (response) {
            setSuccessTitle("Успешно");
            setSuccessMessage("Вы сменили пароль!");
            return setSuccessVisible(true);
        }
    };

    const logOutFun = async () => {
        await dispatch(logout())
    }

    useEffect(() => {
        if (error) {
            setErrorHeader("Ошибка!");
            setErrorMessage(error);
            setErrorVisible(true);
        }
    }, [error]);

    return (
        <ProfileSettings
            formUsername={formUsername}
            formEmail={formEmail}
            formPassword={formPassword}
            isPasswordUserVisible={isPasswordUserVisible}
            isChangingEmailLoading={isChangingEmailLoading}
            isChangingUsernameLoading={isChangingUsernameLoading}
            isChangeUsernameButtonDisabled={isChangeUsernameButtonDisabled}
            errorVisible={errorVisible}
            errorHeader={errorHeader}
            errorMessage={errorMessage}
            isChangeEmailButtonDisabled={isChangeEmailButtonDisabled}
            isPasswordEmailVisible={isPasswordEmailVisible}
            successTitle={successTitle}
            successMessage={successMessage}
            successVisible={successVisible}
            isChangingPasswordLoading={isChangingPasswordLoading}
            isChangePasswordButtonDisabled={isChangePasswordButtonDisabled}
            setSuccessVisible={setSuccessVisible}
            setErrorVisible={setErrorVisible}
            handleValuesUserChange={handleValuesUserChange}
            onFinishUsername={onFinishUsername}
            onFinishEmail={onFinishEmail}
            handleValuesEmailChange={handleValuesEmailChange}
            onFinishPassword={onFinishPassword}
            handleValuesPasswordChange={handleValuesPasswordChange}
            logOutFun={logOutFun}
        />
    );
};

export default ProfileSettingsContainer;
