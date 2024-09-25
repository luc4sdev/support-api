import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
    await prisma.client.deleteMany()

    for (let i = 0; i <= 100; i++) {
        await prisma.client.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            }
        })
    }

}

seed().then(() => {
    console.log('Database seeded!')
})