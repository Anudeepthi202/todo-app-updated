import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connect from './utils/connect';
import tasksRoutes from './routes/tasks';
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('✅ Server is working!');
});

// Load task routes
console.log('✅ Loaded tasksRoutes');
app.use('/api/tasks', tasksRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connect();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});