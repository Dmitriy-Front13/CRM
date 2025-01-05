import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerDocs from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';

import employeeRoutes from './routes/employeeRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import approvalRequestRoutes from './routes/approvalRequestRoutes.js';
import leaveRequestRoutes from './routes/leaveRequestRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://erp-system-frontend-zeta.vercel.app'], // URL фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Методы, которые разрешены
    credentials: true, // Если нужно отправлять куки
  })
);


app.get('/', (req, res) => {
  res.send('Backend is running!');
});
// Подключение маршрутов
app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/project', projectRoutes);
app.use('/approval-requests', approvalRequestRoutes);
app.use('/leave-requests', leaveRequestRoutes);

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Запуск сервера
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
