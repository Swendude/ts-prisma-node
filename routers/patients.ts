import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const allPatients = await prisma.patient.findMany({
    select: {
      id: true,
      name: true,
      age: true,
      doctor: true
    }
  });
  res.status(200).send(allPatients);
});

router.patch("/:id", async (req, res) => {
  const {
    name,
    age,
    doctorId
  }: { name: string; age: string; doctorId: string } = req.body;
  const { id } = req.params;
  if (!name && !age && !doctorId) {
    res.status(400).send("Please provide either name, age or doctorId");
    return;
  }

  // If there is an age and it's not a valid integer
  if (age && !parseInt(age)) {
    res.status(400).send("Age must be a number");
    return;
  }
  // If there is an doctorId and it's not a valid integer
  if (doctorId && !parseInt(doctorId)) {
    res.status(400).send("DoctorId must be a number");
    return;
  }

  // Check if the doctor exists
  const doctorCheck = await prisma.doctor.findUnique({
    where: { id: parseInt(doctorId) }
  });
  if (!doctorCheck) {
    res.status(400).send(`Doctor with id=${doctorId} does not exist!`);
    return;
  }
  const updatedPatient = await prisma.patient.update({
    where: { id: parseInt(id) },
    data: {
      name,
      age: parseInt(age) || undefined,
      doctorId: parseInt(doctorId) || undefined
    }
  });
  res.status(200).send(updatedPatient);
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
