const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");


//CREATE TASK
/**
 * @swagger
 * /create:
 *   post:
 *     summary: Crear una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post("/create", async(req, res) => {
    try {
        const task = await Task.create({...req.body, completed: false });
        res.status(201).send({ message: "Task successfully created", task });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});


//GET TASKS
/**
 * @swagger
 * /task:
 *   get:
 *     summary: Obtener todas las tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/", async(req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        console.error(error);
    }
});


//GET TASK BY ID
/**
 * @swagger
 * /id/{_id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.get("/id/:_id", async(req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        res.send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "There was a problem with the task with _id number: " +
                req.params._id,
        });
    }
});


//MARK TASK AS COMPLETED (en este endpoint no le permitimos que edite el titulo)
/**
 * @swagger
 * /markAsCompleted/{_id}:
 *   put:
 *     summary: Marcar una tarea como completada
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea marcada como completada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.put("/markAsCompleted/:_id", async(req, res) => {
        try {
            const task = await Task.findByIdAndUpdate(
                req.params._id, {
                    completed: true,
                }, { new: true }
            );
            res.send({ message: "Task successfully updated", task });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem trying to update the task with _id: " +
                    req.params._id,
            });
        }
});


//UPDATE TASK
/**
 * @swagger
 * /id/{_id}:
 *   put:
 *     summary: Actualizar el título de una tarea
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.put("/id/:_id", async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, req.body, { new: true })
        res.send({ message: "task successfully updated", task });
    } catch (error) {
        console.error(error);
    }
});


//DELETE TASK
/**
 * @swagger
 * /id/{_id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.delete("/id/:_id", async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        res.send({ message: "task deleted", task });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to delete a task" });
    }
});

module.exports = router;