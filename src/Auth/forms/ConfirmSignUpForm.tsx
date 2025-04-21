// src/Auth/forms/ConfirmSignUpForm.tsx
import React from 'react';
import { AuthFormProps } from '../types/authTypes';
import Input from '../components/LoginInput'; // Use custom Input
import Button from '../components/LoginButton'; // Use custom Button

const ConfirmSignUpForm: React.FC<AuthFormProps> = ({
    form,
    isLoading,
    setFormType,
}) => {
    const { register, formState: { errors } } = form;

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>Verify Your Account</h2>

            <p className="mb-4 text-neutral-900 ">
                A confirmation code was sent to your email<br />
                Please enter the code below.
            </p>

            {/* Use flex flex-col and gap for consistent spacing */}
            <div className='flex flex-col gap-4'>
                <Input
                    id='confirm-code'
                    label="Confirmation Code"
                    type="text"
                    inputMode="numeric" // Hint for numeric keyboard
                    register={register('code', {
                        required: 'Confirmation code is required',
                        minLength: { value: 6, message: 'Code must be 6 digits' },
                        maxLength: { value: 6, message: 'Code must be 6 digits' },
                        pattern: { value: /^[0-9]+$/, message: 'Code must contain only numbers' }
                    })}
                    error={errors.code}
                    placeholder="Enter 6-digit code"
                    disabled={isLoading}
                />

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500" // Primary style
                >
                    {isLoading ? 'Verifying...' : 'Verify Account'}
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

export default ConfirmSignUpForm;

