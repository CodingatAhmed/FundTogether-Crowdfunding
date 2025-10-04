// import { google } from 'googleapis';
import express from 'express';
// import { parse } from 'url';
import session from 'express-session';
const app = express()
app.use(session({
  secret: process.env.VITE_MY_SECRET_KEY!, // use a strong secret in production
  resave: false,
  saveUninitialized: false,
}));
// const [token, setToken] = useState<any>("")
