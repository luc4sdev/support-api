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
            type: 'FISICA',
            document: '70044410200',
            birthDate: '12-02-1992',
            address: {
                street: 'Rua 1',
                number: '12',
                cep: '74000000',
                neighborhood: 'Bairro ABC',
                city: 'New York'
            }
        })

        expect(client.id).toEqual(expect.any(String))
    })
})