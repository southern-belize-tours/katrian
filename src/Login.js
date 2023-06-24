import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import React from 'react';

import LoginForm from './LoginForm.js';
import SignoutButton from './SignoutButton.js';
import Registry from './Registry.js';

function Login() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
          } catch (error) {
          }
        };
        fetchUser();
      }, []);

      const handleSignout = async () => {
        try {
          await Auth.signOut();
          setUser(null);
        } catch (error) {
          console.log('error signing out:', error);
        }
      };
    
      const handleLogin = async () => {
        // console.log("setting user: ", user);
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      };

  return (
    <div>
    {user && (
      <div>
        <SignoutButton onSignout={handleSignout}/>
        <h2>Welcome, {user.username} !</h2>
        <p> Your email is: {user.attributes.email} </p>
        <p>Your role is: {user.signInUserSession.accessToken.payload['cognito:groups']}</p>
        <Registry></Registry>
      </div>
    )}
    {!user && <LoginForm onLogin={handleLogin}/>}
  </div>
  );
} export default Login;
