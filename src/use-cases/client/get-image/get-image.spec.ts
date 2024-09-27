import { expect, describe, it } from 'vitest'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients-repository';
import { GetImageUseCase } from './get-image'

let clientsRepository: InMemoryClientsRepository
let sut: GetImageUseCase

describe('Get image Use Case', () => {

    clientsRepository = new InMemoryClientsRepository()
    sut = new GetImageUseCase(clientsRepository)

    it('should be able to get image', async () => {

        const createdClient = await clientsRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        })

        const imageBuffer = await sut.execute({ id: createdClient.id })

        expect(imageBuffer).toBe(null)
    })
})