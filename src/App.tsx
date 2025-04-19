import { Amplify } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { signIn, signInWithRedirect, signOut, signUp, confirmSignUp, autoSignIn } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
//import {fetchAuthSession, JWT} from 'aws-amplify/auth';


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
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [verify, showVerify] = useState(false)
  const [code , setCode] = useState('')

  //const [idToken, setIdToken] = useState<JWT>();
  const [userData, setUserData] = useState<{ name: string } | undefined>(undefined);

  useEffect(() => {
    try {
      getCurrentUser().then((authUser) => {
        console.log(authUser.signInDetails )
        setUserData({name: authUser.username})
      })
    } catch (err) {
      console.log(err);
    }
  });

  async function handleSignOut() {
    try {
      await signOut({ global: true });
      setUserData(undefined)
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  /**
   * 
   *   async function getIdToken(): Promise<JWT | undefined>{
    try {
      const { idToken } = (await fetchAuthSession()).tokens ?? {};

      return idToken
    } catch(error){
      console.log('token fetch error: ', error);
    }
  }
   * 
   */

  async function handleSignUpConfirmation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const { isSignUpComplete} = await confirmSignUp({
        username: user,
        confirmationCode: code
      });

      if(isSignUpComplete) {
        showVerify(false);
        const signInOutput = await autoSignIn();
        console.log(signInOutput)
      }

    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async function handleSignUp(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { userId, nextStep } = await signUp({
        username: user,
        password,
        options: {
          userAttributes: {
            email,
            name: user,
          }
        }
      });
      if(nextStep.signUpStep === "CONFIRM_SIGN_UP") showVerify(true)
  
      console.log(userId);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function handleSignIn(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const { isSignedIn, nextStep } = await signIn({ username: user, password });
      setLoading(false);
      console.log('isSignedIn:', isSignedIn);
      console.log('nextStep:', nextStep);
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
      <div className="form-container">
            <h2>Create Account</h2>
            <form onSubmit={(e) => handleSignUp(e)}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
                    <label>User name</label>
                <input 
                  type="text" 
                  value={user} 
                  onChange={(e) => setUser(e.target.value)} 
                  required 
                />

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
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
      <hr/>
      {verify && (
        <div>
          <h2>Verify Your Account</h2>
          <form onSubmit={(e) => handleSignUpConfirmation(e)}>
                <label>Verification Code</label>
                <input 
                  type="text" 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  required 
                />
                <button type="submit">
                Verify
              </button>
              </form>
        </div>
      )}
      <hr/>
      <button onClick={handleGoogleSignIn}>
        Sign with Google
      </button>
      <hr/>
      {userData && (
        <div>
          <p>
            Hello user: {userData.name}
          </p>
          <button onClick={handleSignOut}>
            Sign out
          </button>
        </div>
        
      )}
    </div>
  );
}
