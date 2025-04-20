// src/Auth/forms/ForgotPasswordForm.tsx
import React from 'react';
import { AuthFormProps } from '../types/authTypes';

const ForgotPasswordForm: React.FC<AuthFormProps> = ({
    form,
    isLoading,
    setFormType,
}) => {
    const { register, formState: { errors } } = form;

    return (
        <div>
            <h2>Reset Password</h2>
            <p>Enter your username, and we'll send you a code to reset your password.</p>

            <div>
                <label htmlFor="forgot-username">Username or Email</label>
                <input
                    id="forgot-username"
                    type="text"
                    {...register('username', {
                        required: 'Username is required to reset password',
                    })}
                />
                {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending Code...' : 'Send Reset Code'}
            </button>

            <hr />

            {/* Link back to Sign In */}
            <div>
                <button type="button" onClick={() => setFormType && setFormType('signIn')} disabled={isLoading}>
                    Back to Sign In
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
