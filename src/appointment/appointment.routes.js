import { Router } from "express";
import { saveAppointment } from "./appointment.controller.js";
import { createAppointmentValidator } from "../middlewares/appointment-validators.js";

const router = Router();

/**
 * @swagger
 * /createAppointment:
 *   post:
 *     summary: Crea una nueva cita
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               pet:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cita creada exitosamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: No se encontró la mascota
 *       500:
 *         description: Error al crear la cita
 */

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

export default router;