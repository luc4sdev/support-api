import { expect, describe, it } from 'vitest'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients-repository';
import { GetClientUseCase } from './get-client';

let clientsRepository: InMemoryClientsRepository
let sut: GetClientUseCase

describe('Get Client Use Case', () => {

    clientsRepository = new InMemoryClientsRepository()
    sut = new GetClientUseCase(clientsRepository)

    it('should be able to get client', async () => {

        const createdClient = await clientsRepository.create({
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

        const client = await sut.execute({ clientId: createdClient.id })

        expect(client.name).toEqual('John Doe')
    })
})