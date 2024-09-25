import { ClientsRepository } from '../../../repositories/clients-repository';
import { Client } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

type GetAllClientsUseCaseResponse = { data: Client[], total: number }

export interface GetAllClientsUseCaseRequest {
    query?: string | null;
    pageIndex: number;
}

export class GetAllClientsUseCase {
    constructor(
        private clientsRepository: ClientsRepository
    ) { }

    async execute({ query, pageIndex }: GetAllClientsUseCaseRequest): Promise<GetAllClientsUseCaseResponse> {
        const clients = await this.clientsRepository.findMany({ query, pageIndex })

        if (!clients?.data) {
            throw new ResourceNotFoundError()
        }

        return clients
    }
}