import { Client } from "@prisma/client";
import { ClientsRepository } from "../clients-repository";
import { randomUUID } from "node:crypto";
import { CreateClientUseCaseRequest } from "@/use-cases/client/create-client/create-client";
import { DeleteClientUseCaseRequest } from "@/use-cases/client/delete-client/delete-client";
import { UpdateClientUseCaseRequest } from "@/use-cases/client/update-client/update-client";

export class InMemoryClientsRepository implements ClientsRepository {



    public items: Client[] = []

    async findById(id: string): Promise<Client | null> {
        const client = this.items.find(item => item.id === id)

        if (!client) {
            return null
        }

        return client
    }

    async findMany(): Promise<Client[]> {
        return this.items.filter(client => !client.deleted)
    }

    async findByDocument(document: string): Promise<Client | null> {
        const client = this.items.find(item => item.document === document && item.deleted === false)

        if (!client) {
            return null
        }

        return client
    }


    async create(data: CreateClientUseCaseRequest) {
        console.log(data)
        const client = {
            id: randomUUID(),
            name: data.name,
            type: data.type,
            document: data.document,
            birthDate: data.birthDate,
            address: data.address,
            active: false,
            deleted: false,
            addressId: randomUUID(),
            routerId: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.items.push(client)

        return client
    }



    async update(clientToBeUpdated: UpdateClientUseCaseRequest): Promise<Client> {
        const index = this.items.findIndex(client => client.id === clientToBeUpdated.id)

        const updatedClient = {
            ...this.items[index],
            ...clientToBeUpdated,
            updatedAt: new Date(),
        }
        this.items[index] = updatedClient
        return updatedClient
    }

    async delete({ id }: DeleteClientUseCaseRequest): Promise<Client> {
        const index = this.items.findIndex(client => client.id === id)

        const deletedClient = {
            ...this.items[index],
            deleted: true,
            active: false,
            updatedAt: new Date(),
        }
        this.items[index] = deletedClient
        return deletedClient
    }

}