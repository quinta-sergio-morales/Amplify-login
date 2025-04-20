// src/Auth/forms/NewPasswordForm.tsx
import React from 'react';
import { AuthFormProps } from '../types/authTypes';

const NewPasswordForm: React.FC<AuthFormProps> = ({
    form,
    isLoading,
    setFormType
}) => {
    const { register, formState: { errors }, watch } = form;
    const newPassword = watch('newPassword');

 

    return (
        <div>
            <h2>Set New Password</h2>
            <p>Please check your email for a verification code and enter it below along with your new password.</p>


            {/* Verification Code Field */}
            <div>
                <label htmlFor="reset-code">Verification Code</label>
                <input
                    id="reset-code"
                    type="text"
                    inputMode="numeric"
                    {...register('code', {
                        required: 'Verification code is required',
                        minLength: { value: 6, message: 'Code must be 6 digits' }, // Adjust if needed
                        maxLength: { value: 6, message: 'Code must be 6 digits' }, // Adjust if needed
                        pattern: { value: /^[0-9]+$/, message: 'Code must contain only numbers' }
                    })}
                />
                {errors.code && <p role="alert" style={{ color: 'red' }}>{errors.code.message}</p>}
            </div>

            {/* New Password Field */}
            <div>
                <label htmlFor="reset-new-password">New Password</label>
                <input
                    id="reset-new-password"
                    type="password"
                    autoComplete="new-password"
                    {...register('newPassword', {
                        required: 'New password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        pattern: {
                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
                            message: 'Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character'
                        }
                    })}
                />
                {errors.newPassword && <p style={{ color: 'red' }}>{errors.newPassword.message}</p>}
            </div>

            {/* Confirm New Password Field */}
            <div>
                <label htmlFor="reset-confirm-password">Confirm New Password</label>
                <input
                    id="reset-confirm-password"
                    type="password"
                    autoComplete="new-password"
                    {...register('confirmPassword', {
                        required: 'Please confirm your new password',
                        validate: (value: string | undefined) =>
                            value === newPassword || 'Passwords do not match'
                    })}
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {errors.confirmPassword && <p role="alert" style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Resetting Password...' : 'Set New Password'}
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

export default NewPasswordForm;
