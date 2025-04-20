// src/Auth/forms/ConfirmSignUpForm.tsx
import React from 'react';
import { AuthFormProps } from '../types/authTypes';
// Optional: Import a function to resend code if you implement it
// import { resendSignUpCode } from '../handlers/authHandlers';

const ConfirmSignUpForm: React.FC<AuthFormProps> = ({
    form,
    isLoading,
    setFormType,
}) => {
    const { register, formState: { errors }} = form;
    const usernameForConfirmation = form.getValues('username');
    

    return (
        <div>
            <h2>Verify Your Account</h2>
            <p>A confirmation code has been sent to the email associated with the username: <strong>{usernameForConfirmation || '...'}</strong></p>
            <p>Please enter the code below.</p>

            <div>
                <label htmlFor="confirm-code">Confirmation Code</label>
                <input
                    id='confirm-code'
                    type="text"
                    {...register('code', {
                        required: 'Confirmation code is required',
                        minLength: { value: 6, message: 'Code must be 6 digits' }, 
                        maxLength: { value: 6, message: 'Code must be 6 digits' }, 
                        pattern: { value: /^[0-9]+$/, message: 'Code must contain only numbers' }
                    })}
                    aria-invalid={errors.code ? "true" : "false"}
                />
                {errors.code && <p role="alert" style={{ color: 'red' }}>{errors.code.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify Account'}
            </button>

            <hr />

             {/* Optional: Resend Code Button */}
            {/*
            <div>
                <button type="button" onClick={handleResendCode} disabled={isLoading || resendLoading || !usernameForConfirmation}>
                    {resendLoading ? 'Resending...' : 'Resend Code'}
                </button>
                {resendMessage && <p style={{ color: resendMessage.includes('successfully') ? 'green' : 'red' }}>{resendMessage}</p>}
            </div>
            <hr />
            */}


            <div>
                <button type="button" onClick={() => setFormType && setFormType('signIn')} disabled={isLoading}>
                    Back to Sign In
                </button>
            </div>
        </div>
    );
};

export default ConfirmSignUpForm;
