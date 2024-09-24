import { ClientsRepository } from '../../../repositories/clients-repository';
import { Client } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

type GetAllClientsUseCaseResponse = Client[]


export class GetAllClientsUseCase {
    constructor(
        private clientsRepository: ClientsRepository
    ) { }

    async execute(): Promise<GetAllClientsUseCaseResponse> {
        const clients = await this.clientsRepository.findMany()

        if (!clients) {
            throw new ResourceNotFoundError()
        }

        return clients
    }
}