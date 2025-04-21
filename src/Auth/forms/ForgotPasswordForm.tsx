// src/Auth/forms/ForgotPasswordForm.tsx
import React from 'react';
import { AuthFormProps } from '../types/authTypes';
import Input from '../components/LoginInput'; // Use custom Input
import Button from '../components/LoginButton'; // Use custom Button

const ForgotPasswordForm: React.FC<AuthFormProps> = ({
    form,
    isLoading,
    setFormType,
}) => {
    const { register, formState: { errors } } = form;

    return (
        // Assuming FormContainer provides the outer div, title, and padding
        <div>
            <h2 className='text-xl font-bold mb-4'>Reset Password</h2>
            <p className="mb-4 text-neutral-900 ">
                Enter your username or email, and we'll send a code to reset your password.
            </p>

            {/* Use flex flex-col and gap for consistent spacing */}
            <div className='flex flex-col gap-4'>
                <Input
                    id="forgot-username"
                    label="Username or Email" // Updated label
                    type="text"
                    register={register('username', {
                        required: 'Username or email is required',
                    })}
                    error={errors.username}
                    placeholder="Enter your username or email" // Added placeholder
                    disabled={isLoading}
                    autoComplete="username" // Added autocomplete
                />
                {/* Error message is handled by the Input component */}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500" // Primary style
                >
                    {isLoading ? 'Sending Code...' : 'Send Reset Code'}
                </Button>
            </div>

            <div className="text-center mt-3 text-sm">
                <button
                    type="button"
                    onClick={() => setFormType && setFormType('signIn')}
                    disabled={isLoading}
                    className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Back to Sign In
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
