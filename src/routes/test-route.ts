import { PrismaClient } from "@prisma/client";
import e from "express";
const prisma = new PrismaClient();

import express, { Request, Response } from "express";
const router = express.Router();

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get paginated contacts
 *     description: Retrieve paginated contacts with details
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *         default: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *         default: 10
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of items
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 contacts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 */
router.get("/contacts", async (req, res) => {
  try {
    const { page = '1', pageSize = '10' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);

    const totalCount = await prisma.contact.count();
    const contacts = await prisma.contact.findMany({
      skip: skip,
      take: parseInt(pageSize as string),
    });

    const totalPages = Math.ceil(totalCount / parseInt(pageSize as string));

    res.json({
      currentPage: parseInt(page as string),
      totalItems: totalCount,
      pageSize: parseInt(pageSize as string),
      totalPages,
      contacts,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/contact/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieve a contact by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Contact ID
 *         required: true
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *             example:
 *               id: 10
 *               name: John Doe
 *               email: john@example.com
 */
router.get("/contact/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.contact.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Create a contact
 *     description: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *             example:
 *               id: 1
 *               name: John Doe
 *               email: john@example.com
 */
router.post("/api/contact", async (req, res) => {
  try {
    const { name, email } = req.body;

    const newContact = await prisma.contact.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/contact/{id}:
 *   put:
 *     description: Returns something
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *    - in: body
 *      name: body
 *      required: true
 */
router.put("/contact/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.contact.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

/**
 * @swagger
 * /api/contact/{id}:
 *   delete:
 *     description: Returns something
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 */
router.delete("/contact/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.contact.delete({
      where: {
        id: Number(id),
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

export default router;
