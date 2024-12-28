import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import swaggerDocs from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';

import login from './controllers/loginController.js';
import employeeRoutes from './routes/employeeRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import approvalRequestRoutes from './routes/approvalRequestRoutes.js';
import leaveRequestRoutes from './routes/leaveRequestRoutes.js';

dotenv.config();

const app = express();
app.use(cookieParser());
// Middleware для JSON
app.use(express.json());

// Middleware для CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // URL фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Методы, которые разрешены
    credentials: true, // Если нужно отправлять куки
  })
);

const csrfProtection = csrf({ cookie: true });
// Базовый маршрут для проверки сервера
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
app.post('/login', login);
app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
// Подключение маршрутов
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
