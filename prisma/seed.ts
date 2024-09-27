import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function seed() {
    await prisma.client.deleteMany()
    await prisma.user.deleteMany()

    await prisma.user.create({ data: { name: 'Admin', email: 'admin@email.com', password: await bcrypt.hash('admin123', 10) } })

    for (let i = 0; i <= 100; i++) {
        await prisma.client.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number('(##) #####-####')
            }
        })
    }

}

seed().then(() => {
    console.log('Database seeded!')
})