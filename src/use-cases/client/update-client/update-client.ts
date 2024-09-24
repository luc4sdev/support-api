import { ClientsRepository } from "@/repositories/clients-repository";
import { Client } from "@prisma/client";

export interface UpdateClientUseCaseRequest {
    id: string
    name?: string
    type?: "FISICA" | "JURIDICA"
    document?: string
    birthDate?: string
    address?: {
        street?: string;
        number?: string;
        cep?: string;
        neighborhood?: string;
        city?: string;
    }
}

interface UpdateClientUseCaseResponse {
    client: Client
}

export class UpdateClientUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ id, name, type, document, birthDate, address }: UpdateClientUseCaseRequest): Promise<UpdateClientUseCaseResponse> {


        const client = await this.clientsRepository.update({ id, name, type, document, birthDate, address })

        return {
            client
        }

    }
}

