import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";  // Corrigir o import do CORS
import mainRouter from "./routes/main";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",  
    info: {
      title: "Banking API",
      version: "1.0.0",
      description: "API para transações bancárias",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    servers: [
      {
        url: "http://localhost:3000",  
      },
    ],
  },
  apis: ["./src/routes/*.ts"],  
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));  // Usar a configuração corrigida

app.use(mainRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
