import { ClientsRepository } from "@/repositories/clients-repository";
import { ClientAlreadyExistsError } from "@/use-cases/errors/client-already-exists-error";
import { Client } from "@prisma/client";

export interface CreateClientUseCaseRequest {
    name: string
    type: "FISICA" | "JURIDICA"
    document: string
    birthDate: string
    address: {
        street: string;
        number: string;
        cep: string;
        neighborhood: string;
        city: string;
    }
}

interface CreateClientUseCaseResponse {
    client: Client
}

export class CreateClientUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ name, type, document, birthDate, address }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {

        const clientWithSameDocument = await this.clientsRepository.findByDocument(document)

        if (clientWithSameDocument) {
            throw new ClientAlreadyExistsError()
        }

        const client = await this.clientsRepository.create({ name, type, document, birthDate, address })

        return {
            client
        }

    }
}

