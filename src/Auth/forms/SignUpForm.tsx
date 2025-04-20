// src/Auth/forms/SignUpForm.tsx
import React from 'react';
import { AuthFormProps} from '../types/authTypes';

const SignUpForm: React.FC<AuthFormProps> = ({
    form,
    isLoading,
    setFormType,
}) => {
    const { register, formState: { errors }, watch } = form;
    const password = watch('password');

    return (
        <div>
            <h2>Create Account</h2>
            <div>
                <label htmlFor="signup-username">Username</label>
                <input
                    id="signup-username"
                    type="text"
                    {...register('username', {
                        required: 'Username is required',
                        minLength: { value: 3, message: 'Username must be at least 3 characters' }
                        // Add other Cognito specific username constraints if needed
                    })}
                    aria-invalid={errors.username ? "true" : "false"}
                    autoComplete="username"
                />
                {errors.username && <p role="alert" style={{ color: 'red' }}>{errors.username.message}</p>}
            </div>

            <div>
                <label htmlFor="signup-email">Email</label>
                <input
                    id="signup-email"
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                        }
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                    autoComplete="email"
                />
                {errors.email && <p role="alert" style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="signup-password">Password</label>
                <input
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        pattern: {
                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
                            message: 'Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character'
                        }
                    })}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                {/* Optional: Display password policy hints */}
                {/* <small>Password must be at least 8 characters long.</small> */}
            </div>

            <div>
                <label >Confirm Password</label>
                <input
                    type="password"
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match'
                    })}
                />
                {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            <hr />

            <div>
                <span>Already have an account? </span>
                <button type="button" onClick={() => setFormType && setFormType('signIn')} disabled={isLoading}>
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignUpForm;
