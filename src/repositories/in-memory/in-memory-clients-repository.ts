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

    async findMany(): Promise<{ data: Client[], total: number }> {
        const clients = this.items.filter(client => !client.deleted)
        return { data: clients, total: clients.length }
    }

    async findByEmail(document: string): Promise<Client | null> {
        const client = this.items.find(item => item.email === document && item.deleted === false)

        if (!client) {
            return null
        }

        return client
    }


    async create(data: CreateClientUseCaseRequest) {

        const client = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            phone: data.phone as string,
            image: data.image as string,
            imageData: null,
            deleted: false,
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