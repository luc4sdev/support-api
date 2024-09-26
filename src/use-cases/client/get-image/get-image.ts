import { ClientsRepository } from "@/repositories/clients-repository";
import path from 'path';
import { promises } from 'fs';
import { env } from "../../../env";

export interface GetImageUseCaseRequest {
    id: string;
}

type GetImageUseCaseResponse = Buffer | null;

export class GetImageUseCase {

    constructor(private clientsRepository: ClientsRepository) { }

    async execute({ id }: GetImageUseCaseRequest): Promise<GetImageUseCaseResponse> {


        const client = await this.clientsRepository.findById(id);
        if (!client) {
            return null;
        }


        const imageName = client?.image;

        const imageDirectory = path.join(__dirname, '/tmp/');


        const imagePath = path.join(imageDirectory, imageName as string);

        const imageBuffer = await promises.readFile(imagePath);

        return imageBuffer;
    }
}
