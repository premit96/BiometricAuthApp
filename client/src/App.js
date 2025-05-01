import React, { useState } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

function App() {
  const [username, setUsername] = useState('');

  const register = async () => {
    const resp = await fetch('http://localhost:3000/register-options', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const options = await resp.json();

    const attestationResponse = await startRegistration(options);

    await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, attestationResponse }),
    });
  };

  const login = async () => {
    const resp = await fetch('http://localhost:3000/login-options', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const options = await resp.json();

    const assertionResponse = await startAuthentication(options);

    await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, assertionResponse }),
    });
  };

  return (
    <div>
      <h1>Biometric Authentication</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
