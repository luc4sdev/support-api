import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository"
import { UploadImageUseCase } from "@/use-cases/client/upload-image/upload-image"

export function makeUploadImageUseCase() {
    const clientsRepository = new PrismaClientsRepository()
    const registerUseCase = new UploadImageUseCase(clientsRepository)

    return registerUseCase
}