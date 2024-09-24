import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository';
import { GetAllClientsUseCase } from '../../client/get-all-clients/get-all-clients';


export function makeGetAllClientsUseCase() {
    const clientsRepository = new PrismaClientsRepository()

    const useCase = new GetAllClientsUseCase(clientsRepository)

    return useCase
}