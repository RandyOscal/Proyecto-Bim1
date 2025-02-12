import { Router } from "express";
import { savePet, getPets, searchPet, deletePet } from "./pet.controller.js";
import { createPetValidator, getPetByIdValidator, updatePetValidator, deletePetValidator } from "../middlewares/pet-validators.js";

const router = Router();

/**
 * @swagger
 * /addPet:
 *   post:
 *     summary: Agrega una nueva mascota
 *     tags: [Pet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mascota agregada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/addPet", createPetValidator, savePet);

/**
 * @swagger
 * /findPet/{id}:
 *   get:
 *     summary: Busca una mascota por ID
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mascota encontrada
 *       404:
 *         description: Mascota no encontrada
 */
router.get("/findPet/:id", getPetByIdValidator, searchPet);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todas las mascotas
 *     tags: [Pet]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 */
router.get("/", getPets);

/**
 * @swagger
 * /updatePet/{id}:
 *   put:
 *     summary: Actualiza una mascota por ID
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mascota actualizada
 *       400:
 *         description: Error en la solicitud
 */
router.put("/updatePet/:id", updatePetValidator, savePet);

/**
 * @swagger
 * /deletePet/{id}:
 *   delete:
 *     summary: Elimina una mascota por ID
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mascota eliminada
 *       404:
 *         description: Mascota no encontrada
 */
router.delete("/deletePet/:id", deletePetValidator, deletePet);

export default router;