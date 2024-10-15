import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "giuliano@mail.com" },
    update: {},
    create: {
      email: "giuliano@mail.com",
      name: "Giuliano",
      password: "123456",
      isAdmin: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "hiago@mail.com" },
    update: {},
    create: {
      email: "hiago@mail.com",
      name: "Hiago",
      password: "123456",
      isAdmin: false,
    },
  });

  await prisma.user.upsert({
    where: { email: "lara@mail.com" },
    update: {},
    create: {
      email: "lara@mail.com",
      name: "Lara",
      password: "123456",
      isAdmin: false,
    },
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
