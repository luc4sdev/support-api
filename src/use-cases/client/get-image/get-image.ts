import { ClientsRepository } from "@/repositories/clients-repository";

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

        const imageBuffer = client.imageData

        return imageBuffer;
    }
}
