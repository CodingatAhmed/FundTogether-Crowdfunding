// pages/Login.tsx
import React from 'react';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce';

const Login: React.FC = () => {
  const handleLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem('code_verifier', codeVerifier); // Store it to use during token exchange

    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      prompt: 'consent',
      access_type: 'offline',
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    // Open in new tab/window
    window.open(authUrl, '_blank', 'width=500,height=600');
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <button onClick={handleLogin} className="btn">Login</button>
    </div>
  );
};

export default Login;
