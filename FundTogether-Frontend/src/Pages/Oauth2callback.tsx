// import { useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import App from "../App"
export default function OAuth2Callback() {
    return (
    <>
    <h1>Hello</h1>
    <button onClick={()=>window.location.href = "/wc"} type="button" title="hello">
        Go to Hello
        </button>
    </> 
    )
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const code = params.get('code');
//     const state = params.get('state');

//     if (code) {
//       const verifier = sessionStorage.getItem('pkce_verifier');

//       // Send `code` + `verifier` to your backend to exchange for tokens
//       fetch('http://localhost:3000/api/exchange-code', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ code, verifier }),
//       })
//         .then(res => res.json())
//         .then(data => {
//           console.log('Tokens:', data);
//           window.close(); // Close popup
//         });
//     }
//   }, []);

//   return (<p>Handling Google redirect...</p>);
}