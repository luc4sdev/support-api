import { expect, describe, it } from 'vitest'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients-repository';
import { UpdateClientUseCase } from './update-client';

let clientsRepository: InMemoryClientsRepository
let sut: UpdateClientUseCase

describe('Update Client Use Case', () => {

    clientsRepository = new InMemoryClientsRepository()
    sut = new UpdateClientUseCase(clientsRepository)

    it('should be able to update client', async () => {

        const client = await clientsRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        })

        const newClientData = {
            id: client.id,
            name: 'John Doe 2',
            email: 'johndoe2@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        }

        const data = await sut.execute(newClientData)

        expect(data.client.name).toEqual('John Doe 2')
    })
})