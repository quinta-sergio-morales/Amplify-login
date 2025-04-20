import React from 'react';
import { AuthFormProps } from '../types/authTypes';

// This component receives RHF methods and state via props
const SignInForm: React.FC<AuthFormProps> = ({
    form,
    isLoading,
    setFormType,
    handleGoogleSignIn
}) => {
    const { register, formState: { errors } } = form;

    return (
        <div> 
            <h2>Sign In</h2>

            <div>
                <label htmlFor="signin-username">Username or Email</label>
                <input
                    id="signin-username"
                    type="text"
                    {...register('username', { required: 'Username is required' })}
                    aria-invalid={errors.username ? "true" : "false"}
                />
                {errors.username && <p role="alert" style={{ color: 'red' }}>{errors.username.message}</p>}
            </div>

            <div>
                <label htmlFor="signin-password">Password</label>
                <input
                    id="signin-password"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p role="alert" style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <hr />

            <button type="button" onClick={handleGoogleSignIn} disabled={isLoading}>
                Sign In with Google
            </button>

            <hr />
            <div>
                <button type="button" onClick={() => setFormType && setFormType('forgotPassword')} disabled={isLoading}>
                    Forgot Password?
                </button>
            </div>
            <div>
                <span>Need an account? </span>
                <button type="button" onClick={() => setFormType && setFormType('signUp')} disabled={isLoading}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignInForm;
