import { ClientsRepository } from "@/repositories/clients-repository";
import { Client } from "@prisma/client";

export interface UpdateClientUseCaseRequest {
    id: string
    name?: string;
    email?: string;
    phone?: string | null;
    image?: string | null;
    imageData?: Buffer | null;
}

interface UpdateClientUseCaseResponse {
    client: Client
}

export class UpdateClientUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ id, name, email, phone, image }: UpdateClientUseCaseRequest): Promise<UpdateClientUseCaseResponse> {


        const client = await this.clientsRepository.update({ id, name, email, phone, image })

        return {
            client
        }

    }
}

