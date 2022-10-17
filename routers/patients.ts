import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const allPatients = await prisma.patient.findMany();
  res.status(200).send(allPatients);
});

router.patch("/:id", async (req, res) => {
  const { name, age }: { name: string; age: string } = req.body;
  const { id } = req.params;
  if (!name && !age) {
    res.status(400).send("Please provide either name or age");
    return;
  }
  // If there is an age and it's not valid
  if (age && !parseInt(age)) {
    res.status(400).send("Age must be a number");
    return;
  } else {
    const updatedPatient = await prisma.patient.update({
      where: { id: parseInt(id) },
      data: { name, age: parseInt(age) }
    });
    res.status(200).send(updatedPatient);
  }
});

router.post("/", async (req, res) => {
  const { name, age } = req.body;
  // Check required fields
  if (!name || !age) {
    res.status(400).send("Please provide name and age");
    return;
  }

  // Check if age is a valid integer
  if (parseInt(age)) {
    const newPatient = await prisma.patient.create({
      data: { name: name, age: parseInt(age) }
    });
    console.log("new:", newPatient);
    res.status(201).json(newPatient);
  } else {
    res.status(400).send("Age must be a number");
  }
});

export default router;
