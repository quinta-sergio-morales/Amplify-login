import { Amplify } from 'aws-amplify';
import AuthManager from './Auth/AuthManager';
//import {fetchAuthSession, JWT} from 'aws-amplify/auth';


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_QfVuwRTTC',
      userPoolClientId: '3esrctfmilo18fv9a58ovukhlb',
      signUpVerificationMethod: 'code',
      loginWith: {
        oauth: {
          domain: 'us-east-1qfvuwrttc.auth.us-east-1.amazoncognito.com',
          scopes: [
            'phone',
            'email',
            'profile',
            'openid',
            'aws.cognito.signin.user.admin'
          ],
          redirectSignIn: ['https://main.d5ccdrnzzzrp5.amplifyapp.com/'],
          redirectSignOut: ['http://localhost:5173/'],
          responseType: 'code' 
        }
      }
    }
  }
});

export default function App() {
  
  return (
    <AuthManager />
  );
}
