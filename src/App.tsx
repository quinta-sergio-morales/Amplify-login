import { Amplify } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { JWT, signIn, signInWithRedirect } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import {
  fetchAuthSession,
} from 'aws-amplify/auth';


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_QfVuwRTTC',
      userPoolClientId: '3esrctfmilo18fv9a58ovukhlb',
      signUpVerificationMethod: 'code', // 'code' | 'link'
      loginWith: {
        // OPTIONAL - Hosted UI configuration
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
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState<JWT>();
  const [userData, setUserData] = useState<{ name: string } | undefined>(undefined);

  useEffect(() => {
    try {
      getCurrentUser().then((authUser) => {
        setUserData({name: authUser.username})
      })
    } catch (err) {
      console.log(err);
    }
  });

  async function handleSignIn(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const { isSignedIn, nextStep } = await signIn({ username: user, password });
      setLoading(false);
      console.log('isSignedIn:', isSignedIn);
      console.log('nextStep:', nextStep);
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      setIdToken(idToken);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async function handleGoogleSignIn(){
    signInWithRedirect({provider: "Google"})
  }
  
  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label>User name</label>
          <input 
            type="text" 
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <hr/>
      <button onClick={handleGoogleSignIn}>
        Sign with Google
      </button>
      {idToken && <p>ID token: {idToken.toString()}</p>}
      {userData && <p>Hello user: {userData.name}</p>}
    </div>
  );
}
