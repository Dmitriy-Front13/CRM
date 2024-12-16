import swaggerJsDoc from 'swagger-jsdoc';


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for our API',
    },
  },
  apis: ['./src/routes/*.js'], // Указываем пути к файлам с маршрутами
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
