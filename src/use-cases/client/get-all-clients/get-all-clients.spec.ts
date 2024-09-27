import { expect, describe, it } from 'vitest'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients-repository';
import { GetAllClientsUseCase } from './get-all-clients';

let clientsRepository: InMemoryClientsRepository
let sut: GetAllClientsUseCase

describe('Get All Clients Use Case', () => {

    clientsRepository = new InMemoryClientsRepository()
    sut = new GetAllClientsUseCase(clientsRepository)

    it('should be able to get all clients', async () => {

        await clientsRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        })

        await clientsRepository.create({
            name: 'John Doe',
            email: 'johndoe2@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        })

        const clients = await sut.execute({ query: null, pageIndex: 0 })

        expect(clients.data).length(2)
    })
})