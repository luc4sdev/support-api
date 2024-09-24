import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository"
import { UpdateClientUseCase } from "../../client/update-client/update-client"

export function makeUpdateClientUseCase() {
    const clientsRepository = new PrismaClientsRepository()
    const registerUseCase = new UpdateClientUseCase(clientsRepository)

    return registerUseCase
}