import express, { Request, Response } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig'; // Update the path if necessary

// ROUTES
import test from './routes/test-route'; // Update the path if necessary

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     description: returns 'Hello, TypeScript Express!'
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.use('/api', test);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
