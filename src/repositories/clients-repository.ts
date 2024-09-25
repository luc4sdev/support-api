import { CreateClientUseCaseRequest } from "@/use-cases/client/create-client/create-client";
import { DeleteClientUseCaseRequest } from "@/use-cases/client/delete-client/delete-client";
import { GetAllClientsUseCaseRequest } from "@/use-cases/client/get-all-clients/get-all-clients";
import { UpdateClientUseCaseRequest } from "@/use-cases/client/update-client/update-client";
import { Client } from "@prisma/client";

export interface ClientsRepository {
    findMany({ query, pageIndex }: GetAllClientsUseCaseRequest): Promise<{ data: Client[], total: number } | null>
    findById(id: string): Promise<Client | null>
    findByEmail(document: string): Promise<Client | null>
    create(data: CreateClientUseCaseRequest): Promise<Client>
    update(data: UpdateClientUseCaseRequest): Promise<Client>
    delete(data: DeleteClientUseCaseRequest): Promise<Client>
}