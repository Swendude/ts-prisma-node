import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import PatientRouter from "./routers/patients";
import DoctorRouter from "./routers/doctors";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from TS + Express + Prisma");
});

app.use("/patients", PatientRouter);
app.use("/doctors", DoctorRouter);
app.listen(4000, () => console.log("Listening!"));
