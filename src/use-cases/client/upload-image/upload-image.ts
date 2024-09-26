import { ClientsRepository } from "@/repositories/clients-repository";
import { Client } from "@prisma/client";
import crypto from 'crypto';

export interface UploadImageUseCaseRequest {
    id: string;
    baseName: string;
    extension: string;
    buffer: Buffer;
}

interface UploadImageUseCaseResponse {
    client: Client
}

export class UploadImageUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ id, baseName, extension, buffer }: UploadImageUseCaseRequest): Promise<UploadImageUseCaseResponse> {

        const fileName = `${baseName}${extension}`;

        const client = await this.clientsRepository.update({ id, image: fileName, imageData: buffer })
        return { client }

    }
}

