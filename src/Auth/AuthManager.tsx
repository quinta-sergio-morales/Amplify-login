import React, { useState, useMemo, useEffect } from 'react';
import LoginLayout from './components/LoginLayout';
import FormContainer from './components/FormContainer';
import Infobox from './components/Infobox';

import { useForm, SubmitHandler} from 'react-hook-form';
import {
    FormType,
    AuthFormProps,
    SignInFormData,
    SignUpFormData,
    ConfirmSignUpFormData,
    ForgotPasswordFormData,
    NewPasswordFormData,
    AuthFormData,
    AuthFormFields
    // Import specific form data types if needed for casting/validation
} from './types/authTypes';
import { authHandlers, handleGoogleSignIn as googleSignInHandler } from './handlers/AuthHandlers';

// Import your form components (these don't need changes related to v6 auth calls)
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';
import ConfirmSignUpForm from './forms/ConfirmSignUpForm';
import ForgotPasswordForm from './forms/ForgotPasswordForm';
import NewPasswordForm from './forms/NewPasswordForm';


type FormConfigEntry<TData extends AuthFormData> = {
    Component: React.FC<AuthFormProps>; // The component expects props specific to TData
    defaultValues: TData;                     // Default values must match the TData structure
};

type FormsConfig = {
    signIn: FormConfigEntry<SignInFormData>;
    signUp: FormConfigEntry<SignUpFormData>;
    confirmSignUp: FormConfigEntry<ConfirmSignUpFormData>;
    forgotPassword: FormConfigEntry<ForgotPasswordFormData>;
    newPassword: FormConfigEntry<NewPasswordFormData>;
};

// Form config remains the same
const forms : FormsConfig  =  {
    signIn: { Component: SignInForm, defaultValues: { username: '', password: '' } },
    signUp: { Component: SignUpForm, defaultValues: { username: '', email: '', password: '', confirmPassword: '' } },
    confirmSignUp: { Component: ConfirmSignUpForm, defaultValues: { username: '', code: '' } },
    forgotPassword: { Component: ForgotPasswordForm, defaultValues: { username: '' } },
    newPassword: { Component: NewPasswordForm, defaultValues: { username: '', code: '', newPassword: '', confirmPassword: '' } },
};


const AuthManager: React.FC = () => {
    const [formType, setFormType] = useState<FormType>('signIn');
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const { Component: CurrentFormComponent, defaultValues } = useMemo(() => {

    return forms[formType];
    }, [formType]);

    const form = useForm<AuthFormFields>();

    // Effect to reset form when type or defaults change
    useEffect(() => {
        if (formType === 'confirmSignUp' || formType === 'newPassword') {
            const user = form.getValues("username");
            form.reset(defaultValues);
            form.setValue('username', user);
        } else {
            form.reset(defaultValues);
        };
        setApiError(null);
    }, [formType, form]);

    const handleFormSubmit: SubmitHandler<AuthFormFields> = async (data) => {
        setApiError(null);
        setIsLoading(true);
        form.clearErrors();

        const handler = authHandlers[formType];

        if (!handler) {
            console.error(`No handler found for form type: ${formType}`);
            setApiError(`Unexpected error: Please try again later`);
            setIsLoading(false);
            return;
        }

        try {
            await handler(data, setApiError,setFormType);
        } catch (err: any) {
            console.error("Unhandled form submission error:", err);
            setApiError('An unexpected error occurred during submission.');
        } finally {
            setIsLoading(false);
        }
    };

    const triggerGoogleSignIn = async () => {
        setApiError(null);
        setIsLoading(true);
        await googleSignInHandler(setApiError);
    };

    return (
        <LoginLayout>
            <FormContainer>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} noValidate>
                    <CurrentFormComponent
                        form={form}
                        isLoading={isLoading}
                        setFormType={setFormType}
                        handleGoogleSignIn={triggerGoogleSignIn}
                    />
                </form>
                {
                    apiError && (
                        <div className='w-full mt-8'>
                            <Infobox type='error' message={apiError} />
                        </div>
                    )
                }
            </FormContainer>
        </LoginLayout>
    );
};

export default AuthManager;
