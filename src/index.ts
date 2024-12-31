import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;

const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  res.json(allTodos);
});

app.post("/createTodo", async (req: Request, res: Response) => {
  const { title, isCompleted } = req.body;
  const createTodo = await prisma.todo.create({
    data: {
      title,
      isCompleted,
    },
  });
  res.json(createTodo);
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, isCompleted } = req.body;
  try {
    const editTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        isCompleted,
      },
    });
    res.json(editTodo);
  } catch (e) {
    console.error(e);
  }
});

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleteTodo = await prisma.todo.delete({
      where: { id },
    });
    res.json(deleteTodo);
  } catch (e) {
    console.error(e);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
