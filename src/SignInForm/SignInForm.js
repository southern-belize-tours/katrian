import { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import { signIn, signUp, signOut  } from 'aws-amplify/auth';
import { Button, TextField } from "@mui/material";

export function SignInForm (props) {
    // const { setUser } = useContext(AuthContext); // Using Context API
    const {user, login, logout} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to handle errors

    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const user_res = await signIn({ username, password});
        // const user = await login({username, password})
        console.log(user_res);
        if (user_res.isSignedIn) {
            login(user_res);
        }
        console.log(AuthContext);
        console.log(user);
        // Redirect to another page if needed
      } catch (error) {
        console.log('error signing in', error);
        setError(error.message || 'Error signing in');
      }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
          const newUser = await signUp({
            username,
            password,
            // ... other attributes
          });
          console.log(newUser);
        //   setUser(newUser); // Set the new user in the global context
          // Redirect or further steps
        } catch (error) {
          console.log('error signing up:', error);
          setError(error.message || 'Error signing up');
        }
    };

    const handleSignOut = async (event) => {
        try {
            await signOut();
            logout();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
      <div className="weddingBody">
        {/* <h1>{user}</h1> */}
        { (!user || !user.isSignedIn) ?
        <>
      <form onSubmit={handleLogin} className="flexed col gap centered">
        <h1>Sign In</h1>
        <TextField id="username-existing-user"
            label="Username"
            error={error}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined">
        </TextField>
        <TextField id="password-existing-user"
            label="Password"
            value={password}
            error={error}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined">
        </TextField>
        <Button type="submit"
            variant="outlined">
            Login
        </Button>
        {/* <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label> */}
        <button type="submit">Login</button>
      </form>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Desired Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Desired Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      </>
      :
      <Button variant = 'outlined'
            color = 'primary'
            onClick = {() => {handleSignOut()}}>Sign Out</Button>
        }
        {error && <p>Error: {error}</p>}
      </div>
    );
}
