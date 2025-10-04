import express from 'express';
import { google } from 'googleapis';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import url from "url";
import cors from "cors"
// import { Url } from 'url';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';
import { parse } from 'url';
import jwt from 'jsonwebtoken';
import { log } from 'console';
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true,               // Allow cookies and sessions to be shared
}));
// const router = express.Router()
// import { parse } from 'url';
const PORT = 3000;
// app.use(helmet)
app.use(express.json())
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "'unsafe-inline'"], // Add your trusted script sources here
//       styleSrc: ["'self'", "'unsafe-inline'"], // Add your trusted style sources here
//       imgSrc: ["'self'", "data:", "https://placehold.co"], // Add your trusted image sources
//       // You may need to add more directives as your application grows
//     },
//   },
//   // Other Helmet middleware are included by default, like:
//   // X-DNS-Prefetch-Control, X-Frame-Options, X-Powered-By, Strict-Transport-Security, etc.
// }));
app.use(session({
  secret: process.env.VITE_MY_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // In production, 'secure' should be true and you must use HTTPS
    secure: 'auto',
    // In development, httpOnly can be false for easier debugging, but should be true in production.
    httpOnly: false,
    sameSite: 'lax', // Use 'lax' for same-site cookie behavior
  },
}));
// Initializing a client for authentication
const oauth2Client = new google.auth.OAuth2(
  process.env.VITE_GOOGLE_CLIENT_ID,
  process.env.VITE_GOOGLE_CLIENT_SECRET,
  process.env.VITE_GOOGLE_REDIRECT_URI,
);

//Define scopes based on using google apis to retrieve data
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'openid', 'email', 'profile'
];
// const privateKeyPath = path.join(__dirname, 'private.key');
// // const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

app.get('/routes/googleauth', async (req, res) => {
  // res.json({"message": "H3llo"})
  const state = crypto.randomBytes(32).toString('hex');
  console.log(state);

  // NOW req exists, so this works
  req.session.state = state;

  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    prompt: "consent",
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
    // Include the state parameter to reduce the risk of CSRF attacks.
    state: state,
    response_type: "code",

  });

  // // Redirect the user to Google's OAuth 2.0 server
  res.redirect(authorizationUrl);
});

app.get("/routes/callbackToken", async (req, res) => {
  // const uri = URL.parse(req.url,true).qu

  const q = url.parse(req.url, true).query
  console.log(q);
  console.log(req.query);

  // res.send({req});

  console.log(q.state, "qqueery");
  // console.log(req.session);

  // req.session.s  
  // console.log(q.error);

  console.log(req.session, "code");

  console.log("Hello")
  if (q.error) { // An error response e.g. error=access_denied
    console.log('Error:' + q.error);
    res.end('Error occured');
  } else if (q.state !== req.session.state) { //check state value
    console.log('State mismatch. Possible CSRF attack');
    res.end('State mismatch. Possible CSRF attack');
  }
  else {

    let takeToken = await oauth2Client.getToken(q.code);
    oauth2Client.setCredentials(takeToken.tokens);

    // it verfies the jwt token associated with Google OAuth and holds all info related to authentication
    const ticket = await oauth2Client.verifyIdToken({
      idToken: oauth2Client.credentials.id_token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });
    // ticket.getPayload().sub
    // ticket.getPayload
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = dirname(__filename);
    // const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');
    var privateKey = fs.readFileSync('./private.key', 'utf8');
    console.log(privateKey, "PRIV");
    var publicKey = fs.readFileSync('./public.key', 'utf8');
    console.log(privateKey);
    const myToken = jwt.sign(
      {
        sub: ticket.getPayload().sub,
        email: ticket.getPayload().email,
        name: ticket.getPayload().name,
        picture: ticket.getPayload().picture
      },
      privateKey,
      { algorithm: 'RS256', expiresIn: '4s' }
    );
    req.session.user = jwt.verify(myToken, publicKey)
    try {
      const decoded = jwt.verify(myToken, publicKey)
      console.log(decoded);
      // res.send(decoded)
      // console.log(oauth2Client.credentials.id_token, "id token");
      // console.log(oauth2Client.credentials.id_token, "credential id token");

      // console.log(takeToken.tokens.id_token, "take token");
      // req.session.user  = decoded
      // console.log(req.session.user);

      console.log(req.session, "mysession")
      res.redirect("http://localhost:5173/mainpage")
    }
    catch (err) {
      console.log("Invalid public key used")
    }
    //   const myToken = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    //   console.log(token);
    // });

    // eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxMDMzODYwNzE2ZTNhMmFhYjM4MGYwMGRiZTM5YTcxMTQ4NDZiYTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NjQyMzIzNzY5ODMtaW44NG9yc2I4cmY1OXVmanM3ZmplbjdvYW5iam9hZmwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NjQyMzIzNzY5ODMtaW44NG9yc2I4cmY1OXVmanM3ZmplbjdvYW5iam9hZmwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE0MTI1OTM4NDI2MjU4MjI0MjciLCJlbWFpbCI6ImFobWVkYWJkdWxyZWhtYW4yMDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicmdlMjBRZklaRlNkM2owX0FHUzUwdyIsIm5hbWUiOiJBaG1lZCBBYmR1bCBSZWhtYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSWhKdjRNUWJLQjNicjY2amxHc0Q2aVhZeW9WY0ZIbnFYR1dhQjhSTTNCTVhkZWN3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFobWVkIiwiZmFtaWx5X25hbWUiOiJBYmR1bCBSZWhtYW4iLCJpYXQiOjE3NTI5Njg0NjcsImV4cCI6MTc1Mjk3MjA2N30.ryVKGrnT2zx1iTNhfO_qfHUDqbUibBUKEh6-92vvVsQLkuQ-l0RTIsKkDigobuH3cCbvk7eRAxaS9ukW6x50JK-snERtBG1b8bNgwRaKXb8S-pQHjaq4loEc3FGYmEXgbPZ_-zJegQpcK3Pxd1JeQIu_V6OWAb4Gs___63PKbJRjWPfQ1qjD2JNNQQg-JvGjh_ccULhmuG2RLHcKp9TtKa1NpF4QNmNEu3fkee7-FK4oR6-WIz4D2Vg5XfI-v1qa3qpZWyricOm4AbtxYrW0D0J2T5crU7upCwKGDJj9Azr7NQwN2i8wl_dRIveVg-iCiTbYWvlWSEgyZcZiAKyMyQ
    // const secret = jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')
    // const jwt = await new jose.SignJWT(ticket.getPayload(). as any)
    // .setProtectedHeader(ticket.getEnvelope() as any).sign(secret)
    // res.redirect(`https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&client_id=${process.env.VITE_GOOGLE_CLIENT_ID}&client_secret=${process.env.VITE_GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.VITE_GOOGLE_REDIRECT_URI}&code=${q.code}`)
    // res.json({message :"User is secure, no CSRF attacks identified", oauth2Client, ticket, myToken})
    // console.log(req.session)
  }

  // Handle the OAuth 2.0 server response
  // const q = req.query;
  // console.log(req)
  // console.log(q, req)
  // const query = req.baseUrl
  // console.log(req.query)
  app.get('/routes/getData', async (req, res) => {
    console.log(req.session, "get Data session");

    if (req.session.user) {
      // Store user data locally before destroying the session
      const userData = req.session.user;

      // Destroy the session to ensure it cannot be used again
      req.session.destroy(err => {
        if (err) {
          console.error("Failed to destroy session:", err);
          return res.status(500).json({ message: "Failed to destroy session." });
        }

        // Respond to the client with the user data
        res.json({ user: userData, message: "User data found and session destroyed." });
        console.log("Session successfully destroyed.");
      });
    } else {
      res.status(401).json({ message: "No user data found in session." });
    }
  });
  // app.post("routes/callbackToken", (req, res) => {
  //   res.send({"message" : "Hello", req})
  // })
  //   setToken(tokens)
  /** Save credential to the global variable in case access token was refreshed.
   * ACTION ITEM: In a production app, you likely want to save the refresh token
   *              in a secure persistent database instead. */

  // User authorized the request. Now, check which scopes were granted.
  //   if (tokens.scope?.includes('https://www.googleapis.com/auth/drive.metadata.readonly'))
  //     {
  //         // User authorized read-only Drive activity permission.
  //         // Example of using Google Drive API to list filenames in user's Drive.
  //         const drive = google.drive('v3');
  //         drive.files.list({
  //             auth: oauth2Client,
  //             pageSize: 10,
  //             fields: 'nextPageToken, files(id, name)',
  //         }, (err1, res1) => {
  //             if (err1) return console.log('The API returned an error: ' + err1);
  //       const files = res1?.data.files;
  //       if (files?.length) {
  //           console.log('Files:');
  //           files.map((file) => {
  //               console.log(`${file.name} (${file.id})`);
  //             });
  //         } else {
  //             console.log('No files found.');
  //         }
  //     });
  // }
  // else
  //     {
  //         console.log("Drive not exist")
  //         // User didn't authorize read-only Drive activity permission.
  //         // Update UX and application accordingly
  //     }

  //     // Check if user authorized Calendar read permission.
  //     if (tokens.scope?.includes('https://www.googleapis.com/auth/calendar.readonly'))
  //         {
  //             // User authorized Calendar read permission.
  //             // Calling the APIs, etc.
  //         }
  //         else
  //             {
  //                 console.log("calendar not exist")
  //                 // User didn't authorize Calendar read permission.
  //                 // Update UX and application accordingly
  //             }
});

app.get("/routes/revoke", async (req, res) => {
  const get_access_token = parse(req.url, true).query
  console.log(get_access_token);
  let postData = "token=" + get_access_token.access_token;

  // Options for POST request to Google's OAuth 2.0 server to revoke a token
  let postOptions = {
    host: 'oauth2.googleapis.com',
    port: '443',
    path: '/revoke',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  // Set up the request
  const postReq = https.request(postOptions, function (res) {
    res.setEncoding('utf8');
    res.on('data', d => {
      console.log('Response: ' + d);
    });
  });

  postReq.on('error', error => {
    console.log(error)
  });

  // Post the request with data
  postReq.write(postData);
  postReq.end();
  res.json({ message: "Done Revoke", postReq, postData })
});


// const server = http.createServer(app);

// res.json("Helo")





app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// /**
//  * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
//  * from the client_secret.json file. To get these credentials for your application, visit
//  * https://console.cloud.google.com/apis/credentials.
//  */
// const oauth2Client = new google.auth.OAuth2(
//   process.env.VITE_GOOGLE_CLIENT_ID,
//   process.env.VITE_GOOGLE_CLIENT_SECRET,
//   process.env.VITE_GOOGLE_REDIRECT_URI
// );

// // Access scopes for two non-Sign-In scopes: Read-only Drive activity and Google Calendar.
// const scopes = [
//   'https://www.googleapis.com/auth/userinfo.email',
//   'https://www.googleapis.com/auth/userinfo.profile'
// ];

// // Generate a secure random state value.
// const state = crypto.randomBytes(32).toString('hex');

// // Store state in the session
// // req.session.state = state;

// // Generate a url that asks permissions for the Drive activity and Google Calendar scope
// const authorizationUrl = oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',
//   /** Pass in the scopes array defined above.
//     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
//   scope: scopes,
//   // Enable incremental authorization. Recommended as a best practice.
//   include_granted_scopes: true,
//   // Include the state parameter to reduce the risk of CSRF attacks.
//   state: state,
//   response_type : "code",
// });

// app.get("/routes/myindex", async (req,res)=> {
//     res.redirect(authorizationUrl)
// })
// app.listen(PORT, ()=>{
//     console.log(`Connected server at http://localhost:${PORT}`)
// })
