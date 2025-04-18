import { Amplify } from 'aws-amplify';
import { useState } from 'react';
import { JWT, signIn } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_JSWAO5YTo',
      userPoolClientId: '4qnhv31f78s3uido7iub8b2b7c',
      signUpVerificationMethod: 'code', // 'code' | 'link'
      loginWith: {
        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: 'https://us-east-1jswao5yto.auth.us-east-1.amazoncognito.com',
          scopes: [
            'phone',
            'email',
            'profile',
            'openid',
            'aws.cognito.signin.user.admin'
          ],
          redirectSignIn: ['https://main.d1x9uyh5hf29ts.amplifyapp.com/'],
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
  
  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label>Email</label>
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
      {idToken && <p>ID token: {idToken.toString()}</p>}
    </div>
  );
}
