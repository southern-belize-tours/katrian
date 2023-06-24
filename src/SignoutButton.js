import React from 'react';

import { Auth } from 'aws-amplify';

export default function SignoutButton({onSignout}) {
  const handleSignout = async () => {
    try {
      await Auth.signOut();
      // handle successful signout
      onSignout();
    } catch (error) {
      console.log('error signing out:', error);
      // handle signout error
    }
  };

  return (
    <button onClick={handleSignout}>Sign Out</button>
  );
}