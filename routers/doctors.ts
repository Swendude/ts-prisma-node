import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const allDoctors = await prisma.doctor.findMany();
  res.send(allDoctors);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const aDoctor = await prisma.doctor.findUnique({
    where: {
      id: parseInt(id)
    }
  });
  if (!aDoctor) {
    res.status(404).send(`doctor with id=${id} not found`);
    return;
  }
  res.send(aDoctor);
});

export default router;
