import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository"
import { CreateClientUseCase } from "../../client/create-client/create-client"

export function makeCreateClientUseCase() {
    const clientsRepository = new PrismaClientsRepository()

    const registerUseCase = new CreateClientUseCase(clientsRepository)

    return registerUseCase
}