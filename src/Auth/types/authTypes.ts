import { UseFormReturn} from 'react-hook-form';

// Define the possible form types
export type FormType = 'signIn' | 'signUp' | 'confirmSignUp' | 'forgotPassword' | 'newPassword';

export interface SignInFormData {
    username: string;
    password: string;
}

export interface SignUpFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string; // Add this for frontend validation
}


export interface ConfirmSignUpFormData {
    username: string; // Might need to be passed from SignUp or entered again
    code: string;
}

export interface ForgotPasswordFormData {
    username: string;
}

export interface NewPasswordFormData {
    username: string; 
    code: string;
    newPassword: string;
    confirmPassword?: string;
}

// Union type for all possible form data shapes
export type AuthFormData =
    | SignInFormData
    | SignUpFormData
    | ConfirmSignUpFormData
    | ForgotPasswordFormData
    | NewPasswordFormData;

export interface AuthFormFields {
    username?: string; 
    code?: string;
    newPassword: string;
    confirmPassword?: string;
    email?: string;
    password?: string;
}

export interface AuthFormProps {
    form: UseFormReturn<AuthFormFields>; 
    isLoading: boolean;
    setFormType: (type: FormType) => void;
    handleGoogleSignIn: () => void;
}

// Type for the handler functions
export type AuthHandler<T extends AuthFormData> = (
    data: T,
    setApiError: (error: string | null) => void, // For general errors
    setFormType?: (formType: FormType) => void,
) => Promise<void>; // Handlers are async

