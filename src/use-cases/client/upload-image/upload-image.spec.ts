import { expect, describe, it } from 'vitest'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients-repository';
import { UploadImageUseCase } from './upload-image';

let clientsRepository: InMemoryClientsRepository
let sut: UploadImageUseCase

describe('Upload image Use Case', () => {

    clientsRepository = new InMemoryClientsRepository()
    sut = new UploadImageUseCase(clientsRepository)

    it('should be able to upload image', async () => {

        const client = await clientsRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        })

        const mockBuffer = Buffer.from('mocked-image-data');

        const data = await sut.execute({ id: client.id, baseName: 'image', extension: '.png', buffer: mockBuffer })

        expect(data.client.name).toEqual('John Doe')
        expect(data.client.image).toEqual('image.png');
    })
})