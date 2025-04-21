// src/Auth/forms/SignUpForm.tsx
import React, { useState } from 'react'; // Import useState for password visibility
import { AuthFormProps } from '../types/authTypes';
import Button from '../components/LoginButton'; // Use your custom Button
import Input from '../components/LoginInput';   // Use your custom Input
import { Eye, EyeOff } from 'lucide-react'; // Import icons for visibility

const SignUpForm: React.FC<AuthFormProps> = ({
    form,
    isLoading,
    setFormType,
}) => {
    const { register, formState: { errors }, watch } = form;
    const password = watch('password');
    const [showPasswords, setShowPasswords] = useState(false);
    const togglePasswordsVisibility = () => setShowPasswords(!showPasswords);

    // Define password requirements
    const passwordRequirements = [
        "Password must be at least 8 characters",
        "Contain a number",
        "Contain lowercase letter",
        "Contain uppercase letter",
        "Contain symbol"
    ];

    return (
        // Assuming FormContainer provides the main wrapper, padding, and title
        <div>
            <h2 className='text-xl font-bold mb-4'>Create Account</h2>

            {/* Use flex flex-col and gap for consistent spacing */}
            <div className='flex flex-col gap-4'>
                <Input
                    id="signup-username"
                    label="Username"
                    type="text"
                    register={register('username', {
                        required: 'Username is required',
                        minLength: { value: 3, message: 'Username must be at least 3 characters' }
                    })}
                    error={errors.username}
                    placeholder="Choose a username"
                    disabled={isLoading}
                    autoComplete="username"
                />

                <Input
                    id="signup-email"
                    label="Email"
                    type="email"
                    register={register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                        }
                    })}
                    error={errors.email}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    autoComplete="email"
                />

                <div> 
                    <Input
                        id="signup-password"
                        label="Password"
                        type={showPasswords ? 'text' : 'password'}
                        register={register('password', {
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
                                message: 'Password does not meet requirements' // Keep message generic or remove if list is sufficient
                            }
                        })}
                        error={errors.password}
                        placeholder="Password"
                        disabled={isLoading}
                    />
                    {/* Password Requirements List */}
                    <ul id="password-requirements" className="mt-2 ml-5 list-disc list-outside text-xs text-gray-500 space-y-1">
                        {passwordRequirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                     {/* Display validation error below the requirements list */}
                     {errors.password && (
                        <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                    )}
                </div>


                {/* Confirm Password Input */}
                 <div>
                    <Input
                        id="signup-confirmPassword"
                        label="Confirm Password"
                        type={showPasswords ? 'text' : 'password'}
                        register={register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: value => value === password || 'Passwords do not match'
                        })}
                        error={errors.confirmPassword}
                        placeholder="Confirm Password"
                        disabled={isLoading}
                        autoComplete="new-password"
                    />
                    <div className="mt-1 flex items-center text-sm">
                        <button
                            type="button"
                            onClick={togglePasswordsVisibility}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                            aria-label={showPasswords ? "Hide passwords" : "Show passwords"}
                            disabled={isLoading}
                        >
                            {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            {showPasswords ? 'Hide' : 'Show'} Passwords
                        </button>
                    </div>
                </div>


                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500" // Primary button style
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </div>

            {/* Link back to Sign In */}
            <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <button
                    type="button"
                    onClick={() => setFormType && setFormType('signIn')}
                    disabled={isLoading}
                    className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignUpForm;
