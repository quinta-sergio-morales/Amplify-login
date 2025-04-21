import React, { useState } from 'react';
import { AuthFormProps } from '../types/authTypes';
import Button from '../components/LoginButton';
import Input from '../components/LoginInput';
import { Eye, EyeOff } from 'lucide-react';
import googleIcon from '/google-icon-logo.svg'

// This component receives RHF methods and state via props
const SignInForm: React.FC<AuthFormProps> = ({
    form,
    isLoading,
    setFormType,
    handleGoogleSignIn
}) => {
    const { register, formState: { errors } } = form;
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div> 
            <h2>Sign In</h2>
            <div className='py-8'>
                <button type="button" className="w-full p-2 rounded-lg flex items-center justify-center gap-4 border-slate-50 border-2" onClick={handleGoogleSignIn} disabled={isLoading}>
                    <img src={googleIcon} className='w-6'/>
                    <p>Sign In with Google</p>
                </button>
                <div className="relative my-4 flex items-center" aria-hidden="true">
                    <svg className="h-px flex-grow text-gray-300" viewBox="0 0 100 1" preserveAspectRatio="none">
                        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <span className="mx-4 flex-shrink text-sm text-gray-500">OR</span>
                    <svg className="h-px flex-grow text-gray-300" viewBox="0 0 100 1" preserveAspectRatio="none">
                        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <Input
                    id="signup-username"
                    label="Username"
                    type="text"
                    register={register('username', { required: 'Username is required' })}
                    error={errors.username}
                    placeholder="Choose a username"
                    disabled={isLoading}
                />
                <div>
                    <Input
                        id="signin-password" 
                        label="Password" 
                        type={showPassword ? 'text' : 'password'} 
                        register={register('password', { required: 'Password is required' })}
                        error={errors.password} 
                        placeholder="••••••••"
                        disabled={isLoading}
                        autoComplete="current-password"
                    />
                    <div className="mt-1 flex items-center justify-between text-sm"> 
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 mr-1" aria-hidden="true" />
                            ) : (
                                <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                            )}
                            {showPassword ? 'Hide' : 'Show'}
                        </button>

                        {/* Forgot Password Link */}
                        <button
                            type="button"
                            onClick={() => setFormType && setFormType('forgotPassword')}
                            disabled={isLoading}
                            className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500" // Example primary button styling - adjust as needed or use variants
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
            </div>
        </div>
    );
};

export default SignInForm;
