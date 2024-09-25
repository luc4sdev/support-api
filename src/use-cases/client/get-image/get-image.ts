import { ClientsRepository } from "@/repositories/clients-repository";
import { Client } from "@prisma/client";
import crypto from 'crypto';
import path from 'path';
import fs, { promises } from 'fs';
import { pipeline } from 'node:stream'
import { promisify } from "node:util";

const pump = promisify(pipeline)
export interface GetImageUseCaseRequest {
    id: string;
}

type GetImageUseCaseResponse = Buffer | null

export class GetImageUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ id }: GetImageUseCaseRequest): Promise<GetImageUseCaseResponse> {



        const client = await this.clientsRepository.findById(id)
        if (!client) {
            return null
        }
        const imageName = client?.image
        const imagePath = path.join(__dirname, '../../../../tmp/', imageName as string);
        const imageBuffer = await promises.readFile(imagePath);

        return imageBuffer

    }
}

