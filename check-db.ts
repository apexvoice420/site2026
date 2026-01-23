
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Tenants ---');
    const tenants = await prisma.tenant.findMany();
    console.log(JSON.stringify(tenants, null, 2));

    console.log('\n--- Users ---');
    const users = await prisma.user.findMany({ include: { tenant: true } });
    console.log(JSON.stringify(users, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
