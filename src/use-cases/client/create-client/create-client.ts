import { ClientsRepository } from "@/repositories/clients-repository";
import { ClientAlreadyExistsError } from "@/use-cases/errors/client-already-exists-error";
import { Client } from "@prisma/client";

export interface CreateClientUseCaseRequest {
    name: string;
    email: string;
    phone?: string | null;
    image?: string | null;
}

interface CreateClientUseCaseResponse {
    client: Client
}

export class CreateClientUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ name, email, phone, image }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {

        const clientWithSameDocument = await this.clientsRepository.findByEmail(email)

        if (clientWithSameDocument) {
            throw new ClientAlreadyExistsError()
        }

        const client = await this.clientsRepository.create({ name, email, phone, image })

        return {
            client
        }

    }
}

