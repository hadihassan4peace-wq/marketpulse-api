import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Markets
  const markets = await Promise.all([
    prisma.market.upsert({
      where: { name: 'Mile 12 Market' },
      update: {},
      create: { name: 'Mile 12 Market', city: 'Lagos', state: 'Lagos' },
    }),
    prisma.market.upsert({
      where: { name: 'Bodija Market' },
      update: {},
      create: { name: 'Bodija Market', city: 'Ibadan', state: 'Oyo' },
    }),
    prisma.market.upsert({
      where: { name: 'Wuse Market' },
      update: {},
      create: { name: 'Wuse Market', city: 'Abuja', state: 'FCT' },
    }),
  ]);

  // Commodities
  const commodities = await Promise.all([
    prisma.commodity.upsert({
      where: { name: 'Garri' },
      update: {},
      create: { name: 'Garri', unit: 'paint bucket' },
    }),
    prisma.commodity.upsert({
      where: { name: 'Rice (local)' },
      update: {},
      create: { name: 'Rice (local)', unit: 'derica' },
    }),
    prisma.commodity.upsert({
      where: { name: 'Tomatoes' },
      update: {},
      create: { name: 'Tomatoes', unit: 'basket' },
    }),
    prisma.commodity.upsert({
      where: { name: 'PMS (Petrol)' },
      update: {},
      create: { name: 'PMS (Petrol)', unit: 'litre' },
    }),
  ]);

  console.log(`Seeded ${markets.length} markets and ${commodities.length} commodities.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });