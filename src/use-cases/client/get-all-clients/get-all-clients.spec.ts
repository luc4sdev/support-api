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

        await clientsRepository.create({
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

        const clients = await sut.execute()

        expect(clients).length(2)
    })
})