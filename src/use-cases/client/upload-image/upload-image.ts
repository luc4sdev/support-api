import { ClientsRepository } from "@/repositories/clients-repository";
import { Client } from "@prisma/client";
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'node:stream'
import { promisify } from "node:util";

const pump = promisify(pipeline)
export interface UploadImageUseCaseRequest {
    id: string;
    baseName: string;
    extension: string;
    file: any;
}

interface UploadImageUseCaseResponse {
    client: Client
}

export class UploadImageUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ id, baseName, extension, file }: UploadImageUseCaseRequest): Promise<UploadImageUseCaseResponse> {

        const hashFileName = this.generateHashFileName(baseName);
        const fileName = `${hashFileName}${extension}`;
        const uploadDestination = path.resolve(__dirname, '../../../../tmp', fileName)
        await pump(file, fs.createWriteStream(uploadDestination))


        const client = await this.clientsRepository.update({ id, image: fileName })


        return { client }

    }

    private generateHashFileName(fileName: string) {
        const currentDate = new Date().toISOString()
        const hash = crypto.createHash('sha256').update(`${fileName}${currentDate}`).digest('hex');
        const hash32BitHex = hash.substring(0, 8);

        return hash32BitHex;
    }
}

