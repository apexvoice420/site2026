require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...\n');

    // Check if data already exists
    const existingTenants = await prisma.tenant.count();
    if (existingTenants > 0) {
        console.log('✅ Database already seeded. Skipping...');
        return;
    }

    // Create default tenant
    const tenant = await prisma.tenant.create({
        data: {
            name: 'Apex Voice Solutions',
            industry: 'Technology',
            vapiKey: process.env.VAPI_API_KEY,
            phoneNumber: '+1234567890'
        }
    });
    console.log(`✅ Created tenant: ${tenant.name} (${tenant.id})`);

    // Create admin user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'apexvoicesolutions@gmail.com',
            password: hashedPassword,
            name: 'Maurice',
            role: 'ADMIN',
            tenantId: tenant.id
        }
    });
    console.log(`✅ Created admin user: ${admin.email}`);

    // Create default agent
    const agent = await prisma.agent.create({
        data: {
            name: 'Cora - AI Receptionist',
            status: 'ACTIVE',
            vapiAgentId: process.env.VAPI_ASSISTANT_ID,
            tenantId: tenant.id
        }
    });
    console.log(`✅ Created agent: ${agent.name}`);

    // Create sample leads
    const sampleLeads = [
        { firstName: 'John', lastName: 'Peterson', phone: '+15551234567', email: 'john@example.com', status: 'NEW', tags: 'roofing,emergency' },
        { firstName: 'Sarah', lastName: 'Miller', phone: '+15559876543', email: 'sarah@example.com', status: 'CONTACTED', tags: 'plumbing' },
        { firstName: 'Mike', lastName: 'Ross', phone: '+15554567890', email: 'mike@example.com', status: 'QUALIFIED', tags: 'hvac,commercial' },
        { firstName: 'Lisa', lastName: 'Chen', phone: '+15553216549', email: 'lisa@example.com', status: 'NEW', tags: 'electrical' }
    ];

    for (const leadData of sampleLeads) {
        await prisma.lead.create({
            data: {
                ...leadData,
                tenantId: tenant.id
            }
        });
    }
    console.log(`✅ Created ${sampleLeads.length} sample leads`);

    console.log('\n🎉 Seeding complete!');
    console.log('\n📋 Login credentials:');
    console.log(`   Email: ${admin.email}`);
    console.log('   Password: password123');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
