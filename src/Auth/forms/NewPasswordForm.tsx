// src/Auth/forms/NewPasswordForm.tsx
import React, { useState } from 'react'; // Import useState
import { AuthFormProps } from '../types/authTypes';
import Input from '../components/LoginInput'; // Use custom Input
import Button from '../components/LoginButton'; // Use custom Button
import { Eye, EyeOff } from 'lucide-react'; // Import icons

const NewPasswordForm: React.FC<AuthFormProps> = ({
    form,
    isLoading
}) => {
    const { register, formState: { errors }, watch } = form;
    const newPassword = watch('newPassword');
    const [showPasswords, setShowPasswords] = useState(false);
    const togglePasswordsVisibility = () => setShowPasswords(!showPasswords);

    const passwordRequirements = [
        "Password must be at least 8 characters",
        "Contain a number",
        "Contain lowercase letter",
        "Contain uppercase letter",
        "Contain symbol"
    ];

    return (
        // Assuming FormContainer provides the outer div, title, and padding
        <div>
            <h2 className='text-xl font-bold mb-4'>Set New Password</h2>
            <p className="mb-4 text-neutral-900">
                A verification code was sent to the email associated with your username
                <br /> Enter the code and your new password below.
            </p>

            {/* Use flex flex-col and gap for consistent spacing */}
            <div className='flex flex-col gap-4'>
                {/* Verification Code Field */}
                <Input
                    id="reset-code"
                    label="Verification Code"
                    type="text"
                    inputMode="numeric"
                    register={register('code', {
                        required: 'Verification code is required',
                        minLength: { value: 6, message: 'Code must be 6 digits' },
                        maxLength: { value: 6, message: 'Code must be 6 digits' },
                        pattern: { value: /^[0-9]+$/, message: 'Code must contain only numbers' }
                    })}
                    error={errors.code}
                    placeholder="Enter 6-digit code"
                    disabled={isLoading}
                    autoComplete="one-time-code"
                />
                {/* Error handled by Input component */}

                {/* New Password Field */}
                <div>
                    <Input
                        id="reset-new-password"
                        label="New Password"
                        type={showPasswords ? 'text' : 'password'} // Use state for type
                        register={register('newPassword', {
                            required: 'New password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
                                message: 'Password does not meet requirements'
                            }
                        })}
                        error={errors.newPassword}
                        placeholder="Enter new password"
                        disabled={isLoading}
                        autoComplete="new-password"
                        aria-describedby="new-password-requirements" // Link to requirements
                    />
                    <ul className="mt-2 ml-5 list-disc list-outside text-xs text-gray-500 space-y-1">
                        {passwordRequirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>


                {/* Confirm New Password Field */}
                <div>
                    <Input
                        id="reset-confirm-password"
                        label="Confirm New Password"
                        type={showPasswords ? 'text' : 'password'} // Use state for type
                        register={register('confirmPassword', {
                            required: 'Please confirm your new password',
                            validate: (value: string | undefined) =>
                                value === newPassword || 'Passwords do not match'
                        })}
                        error={errors.confirmPassword}
                        placeholder="Confirm new password"
                        disabled={isLoading}
                        autoComplete="new-password"
                    />
                    {/* Single toggle button placed below Confirm Password */}
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
                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500" // Primary style
                >
                    {isLoading ? 'Resetting Password...' : 'Set New Password'}
                </Button>
            </div>
        </div>
    );
};

export default NewPasswordForm;
