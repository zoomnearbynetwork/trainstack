import { PrismaClient, UserRole } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await argon2.hash('Password123!');
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo-institute' },
    update: {},
    create: {
      name: 'Demo Institute',
      slug: 'demo-institute',
      users: {
        create: [
          {
            name: 'Admin User',
            email: 'admin@demo.com',
            passwordHash,
            role: UserRole.SUPER_ADMIN
          },
          {
            name: 'Counselor One',
            email: 'counselor@demo.com',
            passwordHash,
            role: UserRole.COUNSELOR
          }
        ]
      },
      courses: {
        create: [
          {
            title: 'Full Stack Development',
            slug: 'full-stack-development',
            category: 'Programming',
            level: 'Beginner',
            duration: '16 weeks',
            status: 'published'
          },
          {
            title: 'DevOps Bootcamp',
            slug: 'devops-bootcamp',
            category: 'Cloud',
            level: 'Intermediate',
            duration: '12 weeks',
            status: 'published'
          }
        ]
      },
      campaigns: {
        create: {
          name: 'Warm Lead Nurture',
          channel: 'whatsapp',
          triggerType: 'manual',
          status: 'draft',
          configJson: { steps: 3 }
        }
      },
      leads: {
        create: [
          {
            fullName: 'Rahul Sharma',
            email: 'rahul@example.com',
            phone: '+919999999999',
            source: 'website',
            status: 'new',
            score: 65
          },
          {
            fullName: 'Asha Patel',
            email: 'asha@example.com',
            phone: '+919888888888',
            source: 'whatsapp',
            status: 'contacted',
            score: 82
          }
        ]
      }
    }
  });

  console.log(`Seeded tenant ${tenant.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
