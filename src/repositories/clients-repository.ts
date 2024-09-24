import { CreateClientUseCaseRequest } from "@/use-cases/client/create-client/create-client";
import { DeleteClientUseCaseRequest } from "@/use-cases/client/delete-client/delete-client";
import { UpdateClientUseCaseRequest } from "@/use-cases/client/update-client/update-client";
import { Client } from "@prisma/client";

export interface ClientsRepository {
    findMany(): Promise<Client[] | null>
    findById(id: string): Promise<Client | null>
    findByDocument(document: string): Promise<Client | null>
    create(data: CreateClientUseCaseRequest): Promise<Client>
    update(data: UpdateClientUseCaseRequest): Promise<Client>
    delete(data: DeleteClientUseCaseRequest): Promise<Client>
}