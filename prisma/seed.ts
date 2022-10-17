import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // Seed some doctors
  const doctorsData: Prisma.DoctorCreateInput[] = [
    {
      name: "Pepper"
    },
    {
      name: "Dolittle"
    },
    {
      name: "Strange"
    },
    {
      name: "Oetker"
    },
    {
      name: "Who"
    },
    {
      name: "Oetker"
    },
    {
      name: "Evil"
    }
  ];
  doctorsData.forEach(async (doctorData) => {
    await prisma.doctor.create({ data: doctorData });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
