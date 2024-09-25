import { prisma } from "@/lib/prisma";
import { Client } from '@prisma/client'
import { ClientsRepository } from "../clients-repository";
import { CreateClientUseCaseRequest } from "@/use-cases/client/create-client/create-client";
import { UpdateClientUseCaseRequest } from "@/use-cases/client/update-client/update-client";
import { DeleteClientUseCaseRequest } from "@/use-cases/client/delete-client/delete-client";
import { GetAllClientsUseCaseRequest } from "@/use-cases/client/get-all-clients/get-all-clients";

export class PrismaClientsRepository implements ClientsRepository {

    async findMany({ query, pageIndex }: GetAllClientsUseCaseRequest): Promise<{ data: Client[], total: number } | null> {


        const clients = await prisma.client.findMany({
            where: query ? {
                name: {
                    contains: query,
                }
            } : {
            },
            take: 10,
            skip: pageIndex * 10,
            orderBy: {
                createdAt: "desc",
            }
        })

        const total = await prisma.client.count({
            where: query ? {
                name: {
                    contains: query,
                }
            } : {
            }
        });

        return { data: clients, total };
    }

    async findById(id: string): Promise<Client | null> {
        const client = await prisma.client.findUnique({
            where: {
                id,
            },
        })

        return client
    }

    async findByEmail(email: string): Promise<Client | null> {
        const client = await prisma.client.findFirst({
            where: {
                AND: [
                    { email },
                    { deleted: false },
                ],
            },
        })

        return client
    }


    async create(clientToBeCreated: CreateClientUseCaseRequest): Promise<Client> {

        const client = await prisma.client.create({
            data: clientToBeCreated
        })

        return client
    }


    async update(clientToBeUpdated: UpdateClientUseCaseRequest): Promise<Client> {

        const client = await prisma.client.update({
            where: {
                id: clientToBeUpdated.id
            },
            data: clientToBeUpdated
        })


        return client

    }


    async delete({ id }: DeleteClientUseCaseRequest): Promise<Client> {
        const client = await prisma.client.findUnique({
            where: {
                id
            }
        });

        if (!client) {
            throw new Error('Client not found');
        }

        await prisma.client.delete({ where: { id } })

        return client;
    }


}