// src/controllers/taskController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, recurrence } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        recurrence: recurrence || null,
      },
    });
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, recurrence } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description: description || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        recurrence: recurrence || null,
      },
    });
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.json(deleted);
  } catch (err) {
    res.status(404).json({ error: "Task not found" });
  }
};
