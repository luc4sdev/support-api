import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository';
import { GetClientUseCase } from '../../client/get-client/get-client';


export function makeGetClientUseCase() {
    const clientsRepository = new PrismaClientsRepository()


    const useCase = new GetClientUseCase(clientsRepository)

    return useCase
}