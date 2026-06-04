import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Glimpse API Documentation",
      version: "1.0.0",
      description: "API endpoints documentation for the Glimpse backend application",
    },
    servers: [
      {
        url: `${process.env.API_URL}/api/v1`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your Supabase JWT access token here.",
        },
      },
    },
  },
  // Point swagger-jsdoc to your external YAML files instead of routes
  apis: ["./src/docs/*.yaml", "./docs/*.yaml"], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};