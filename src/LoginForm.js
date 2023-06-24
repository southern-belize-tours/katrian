import { useState } from 'react';
import { Auth } from 'aws-amplify';
import React from 'react';

function LoginForm({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await Auth.signIn(username, password);
      // handle successful login
    //   console.log("successful login");
      onLogin();
    } catch (error) {
    //   console.log('error signing in', error);
      // handle login error
    }

    // try {
    //     const { user } = await Auth.signUp({ username, password });
    //     console.log(user);
    // } catch (error) {
    //     console.log('error signing up:', error);
    // }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
} export default LoginForm;
