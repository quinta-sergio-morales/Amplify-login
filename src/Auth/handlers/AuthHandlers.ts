import {
    signIn,
    signUp,
    confirmSignUp,
    resetPassword,            
    confirmResetPassword,    
    signInWithRedirect,
    autoSignIn,     
    // fetchUserAttributes
} from 'aws-amplify/auth';
import {
    FormType,
    AuthHandler,
    SignInFormData,
    SignUpFormData,
    ConfirmSignUpFormData,
    ForgotPasswordFormData,
    NewPasswordFormData,  
} from '../types/authTypes';
import type { SignUpOutput, ResetPasswordOutput } from 'aws-amplify/auth'; // Import specific types

const signInHandler: AuthHandler<SignInFormData> = async (
    data, setApiError
) => {
    try {
        const { isSignedIn, nextStep } = await signIn({
            username: data.username,
            password: data.password
        });
        console.log('Sign in result:', { isSignedIn, nextStep });
        if (isSignedIn) {
            console.log('Sign in successful via handler');
        } else {
            setApiError && setApiError(`Sign in requires additional step: ${nextStep.signInStep}`);
        }
    } catch (err: any) {
        console.error("Sign In error: ", err);
    }
};

const signUpHandler: AuthHandler<SignUpFormData> = async (
    data, setApiError, setFormType
) => {
    try {
        const { isSignUpComplete, userId, nextStep }: SignUpOutput = await signUp({
            username: data.username,
            password: data.password,
            options: { userAttributes: { email: data.email } }
        });
        console.log('Sign up result:', { isSignUpComplete, userId, nextStep });
        if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
             console.log('Sign up successful, confirmation code sent.');
             setFormType && setFormType('confirmSignUp');
        } else {
            console.warn('Unexpected sign up next step:', nextStep);
            setApiError(`Unexpected error in authentication flow`);
        }
    } catch (err: any) {
        console.error("Sign In error: ", err);
    }
};

// confirmSignUpHandler remains the same
const confirmSignUpHandler: AuthHandler<ConfirmSignUpFormData> = async (
    data, setApiError
) => {
    try {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: data.username,
            confirmationCode: data.code
        });
        console.log('Confirmation result:', { isSignUpComplete, nextStep });
        if (isSignUpComplete) {
            const signInOutput = await autoSignIn();
            console.log(signInOutput)
        } else {
             console.warn('Unexpected confirm sign up next step:', nextStep);
             setApiError(`Unexpected error in authentication flow`);
        }
    } catch (err: any) {
        console.error("Confirmation error: ", err);
    }
};

const forgotPasswordHandler: AuthHandler<ForgotPasswordFormData> = async (
    data, setApiError, setFormType
) => {
    try {
        const output: ResetPasswordOutput = await resetPassword({ username: data.username });
        console.log('Reset password result:', output);

        // Check the nextStep details from the output
        const { nextStep } = output;
        if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
            setFormType && setFormType('newPassword'); // Move to the confirm reset password step
        } else {
             console.warn('Unexpected reset password next step:', nextStep);
             setApiError(`Unexpected error in password reset flow`);
        }
    } catch (err: any) {
        console.error("Forgot password error: ", err);
    }
};

const newPasswordHandler: AuthHandler<NewPasswordFormData> = async (
    data, setApiError, setFormType
) => {
    try {
        await confirmResetPassword({
            username: data.username,
            confirmationCode: data.code,
            newPassword: data.newPassword
        });

        setFormType && setFormType('signIn'); // Go back to sign in
    } catch (err: any) {
        console.error("New password error: ", err);
        if(err.code === 'InvalidPasswordException')
            setApiError('Failed to reset password: the new password is invalid.');
        else if(err.code === 'CodeMismatchException')
            setApiError('Failed to reset password: the confirmation code was incorrect.');
    }
};

// --- Exported Handlers Object (no changes needed here) ---
export const authHandlers: { [key in FormType]?: AuthHandler<any> } = {
    signIn: signInHandler,
    signUp: signUpHandler,
    confirmSignUp: confirmSignUpHandler,
    forgotPassword: forgotPasswordHandler, // Keep key name consistent if desired, maps to resetPassword logic
    newPassword: newPasswordHandler,       // Keep key name consistent, maps to confirmResetPassword logic
};

export const handleGoogleSignIn = async (setApiError: (error: string | null) => void) => {
    try {

        await signInWithRedirect({ provider: 'Google' });

    } catch (err: any) {
        console.error("Google Sign In Error:", err);
        setApiError(err.message || 'Failed to initiate Google Sign In.');
    }
};

