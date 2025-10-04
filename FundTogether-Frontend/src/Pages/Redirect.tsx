// Redirect.tsx (Frontend)
const response = await fetch('http://localhost:4000/auth/callback', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    code,
    code_verifier: localStorage.getItem('code_verifier'),
  }),
});

const result = await response.json();
console.log('Server Tokens:', result);
