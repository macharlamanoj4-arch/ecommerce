import express from "express";
import profileRouter from "./api/profile.routes";
import oauthRouter from "./api/oauth.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";
import { authenticate } from "./utils";
import cors from "cors";
import session from 'express-session';
import passport from 'passport';

const app = express();
app.use(express.json());
app.use(httpLogger);

// Session configuration for OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both React dev ports
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

app.use(cors(corsOptions));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use("/", profileRouter);
app.use("/api/auth", oauthRouter);


app.use(HandleErrorWithLogger);

export default app;
