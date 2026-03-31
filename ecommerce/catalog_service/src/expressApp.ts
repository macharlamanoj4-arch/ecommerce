import express from "express";
import catalogRouter from "./api/catalog.routes";
import profileRouter from "./api/profile.routes"
import { httpLogger, HandleErrorWithLogger } from "./utils";
import { authenticate } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(httpLogger);

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
app.use("/products",authenticate, catalogRouter);

app.use(HandleErrorWithLogger);

export default app;
