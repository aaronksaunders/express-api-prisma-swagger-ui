import swaggerJsdoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for your TypeScript Express app",
    },

    components: {
      schemas: {
        Contact: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The contact ID",
            },
            firstName: {
              type: "string",
              description: "The contact first name",
            },
            lastName: {
              type: "string",
              description: "The contact last name",
            },
            email: {
              type: "string",
              description: "The contact email address",
            },
            phone: {
              type: "string",
              description: "The contact phone number",
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.ts"], // Modify this based on your route files location
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
