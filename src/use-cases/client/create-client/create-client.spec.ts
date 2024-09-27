import { CreateClientUseCase } from './create-client';
import { expect, describe, it } from 'vitest'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients-repository';

let clientsRepository: InMemoryClientsRepository
let sut: CreateClientUseCase

describe('Create Client Use Case', () => {

    clientsRepository = new InMemoryClientsRepository()
    sut = new CreateClientUseCase(clientsRepository)

    it('should be able to create client', async () => {

        const { client } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        })

        expect(client.id).toEqual(expect.any(String))
    })
})