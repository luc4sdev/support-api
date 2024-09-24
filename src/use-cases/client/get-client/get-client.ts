import { ClientsRepository } from '../../../repositories/clients-repository';
import { Client } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

interface GetClientUseCaseRequest {
    clientId: string;
}

type GetClientUseCaseResponse = Client


export class GetClientUseCase {
    constructor(
        private clientsRepository: ClientsRepository
    ) { }

    async execute({ clientId }: GetClientUseCaseRequest): Promise<GetClientUseCaseResponse> {
        const client = await this.clientsRepository.findById(clientId)

        if (!client) {
            throw new ResourceNotFoundError()
        }

        return client
    }
}