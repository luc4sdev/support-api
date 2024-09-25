import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository"
import { GetImageUseCase } from "@/use-cases/client/get-image/get-image"


export function makeGetImageUseCase() {
    const clientsRepository = new PrismaClientsRepository()
    const registerUseCase = new GetImageUseCase(clientsRepository)

    return registerUseCase
}