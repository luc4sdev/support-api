import { ClientsRepository } from "@/repositories/clients-repository";
import { Client } from "@prisma/client";

export interface DeleteClientUseCaseRequest {
    id: string
}

interface DeleteClientUseCaseResponse {
    client: Client
}

export class DeleteClientUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ id }: DeleteClientUseCaseRequest): Promise<DeleteClientUseCaseResponse> {


        const client = await this.clientsRepository.delete({ id })

        return {
            client
        }

    }
}

