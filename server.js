const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS (important for Swagger UI and external access)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// ---------------------
// Swagger Configuration
// ---------------------
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Example Express API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation and POST example.',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local server',
      },
    ],
  },
  apis: ['./server.js'], // Path to API docs (this file)
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger docs UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Serve raw Swagger JSON (fixes NetworkError)
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// ---------------------
// Routes
// ---------------------

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a greeting message.
 *     responses:
 *       200:
 *         description: Returns a simple greeting.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World!
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint.
 *     responses:
 *       200:
 *         description: Returns OK if server is running.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
app.get('/health', (req, res) => {
  res.send('OK');
});

/**
 * @swagger
 * /api/data:
 *   post:
 *     summary: Accepts and echoes back JSON data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Antarip
 *               age:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       200:
 *         description: Returns the received JSON data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 receivedData:
 *                   type: object
 */
app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({
    success: true,
    receivedData: data,
  });
});

// ---------------------
// Start Server
// ---------------------
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`📘 Swagger UI at http://localhost:${port}/api-docs`);
});
