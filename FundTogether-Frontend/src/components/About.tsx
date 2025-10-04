import { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
export default function App() {
  const [Data, setData] = useState<any>(null)
  const [Token, setToken] = useState<any>(null)
  console.log(useParams());
  
  const fetchData = async () => {
  //   try {
  //     const params = new URLSearchParams(window.location.search);
  //   const code = params.get("code");
  //   const state = params.get("state");
  //   let url;
  //   if (code && state) {
  //     // Redirect to backend and preserve query parameters
  //     url = `http://localhost:3000/routes/callbackToken?code=${code}&state=${state}`;
  //   }
  //   else {
  //     // Redirect to backend and preserve query parameters
  //     url = `http://localhost:3000/routes/callbackToken?error=access_denied`;
  //   }
  //   let URL_config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: url,
  //     withCredentials : true,
  //     state: state,
  //     code : code
  //   };
  //   // console.log(URL_config.url);
    
  //   const URLresponse = await axios.get(URL_config.url,URL_config)
  //   console.log(URLresponse)
  //   setToken(URLresponse.data.oauth2Client.credentials.access_token);
  //   console.log(Token);
  //   const access_token = URLresponse.data.oauth2Client.credentials.access_token;
    
    
  //   setData("Successful");
  //   try {
  //     const revokeTokenResponse = await axios.get(`http://localhost:3000/routes/revoke?access_token=${access_token}`,access_token)
  //     console.log(revokeTokenResponse);
  //   }catch(error) {
  //     console.log(error);
      
  //   }
  // }
  axios.defaults.withCredentials = true;
  try {
    const getData = await axios.get('http://localhost:3000/routes/getData')
    console.log(getData);
    
    }
    catch(error) {
      setData("Failed to reach login point")
      console.log("error occured", error)
  }
  // let postData = "token=" + Token
  //   // Options for POST request to Google's OAuth 2.0 server to revoke a token
  //   let RevokeToken = {
  //   host: 'oauth2.googleapis.com',
  //   port: '443',
  //   path: '/revoke',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Content-Length': new TextEncoder().encode(postData).length.toString()
  //   }
  //   };
  };

  
  return (
    <>  {!Data ? (
    <button id="my-signin2" onClick={fetchData} title='hello'>Click</button>

    ) : (
    <p>{Data}</p>
  )}
  <p>{Token}</p>
    {/* sign in button */}
    </>     
  )
}
