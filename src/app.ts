import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import companyRoutes from './routes/company';
import contactRoutes from './routes/contact';
import { authenticateToken } from './middleware/auth';

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.use('/v1/auth', authRoutes);
app.use('/v1/companies', authenticateToken, companyRoutes);
app.use('/v1/contacts', authenticateToken, contactRoutes);

export default app;