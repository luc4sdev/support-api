import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository"
import { DeleteClientUseCase } from "../../client/delete-client/delete-client"

export function makeDeleteClientUseCase() {
    const clientsRepository = new PrismaClientsRepository()
    const registerUseCase = new DeleteClientUseCase(clientsRepository)

    return registerUseCase
}