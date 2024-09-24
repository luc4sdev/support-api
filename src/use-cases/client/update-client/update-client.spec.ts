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

        const newClientData = {
            id: client.id,
            name: 'John Doe 2',
            document: '70044410200',
            birthDate: '12-02-1992',
            address: {
                street: 'Rua 1',
                number: '12',
                cep: '74000000',
                neighborhood: 'Bairro ABC',
                city: 'São Paulo'
            }
        }

        const data = await sut.execute(newClientData)

        expect(data.client.name).toEqual('John Doe 2')
    })
})