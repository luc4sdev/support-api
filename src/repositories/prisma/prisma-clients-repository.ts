import { prisma } from "@/lib/prisma";
import { Client } from '@prisma/client'
import { ClientsRepository } from "../clients-repository";
import { CreateClientUseCaseRequest } from "@/use-cases/client/create-client/create-client";
import { UpdateClientUseCaseRequest } from "@/use-cases/client/update-client/update-client";
import { DeleteClientUseCaseRequest } from "@/use-cases/client/delete-client/delete-client";
//import { getClient } from "@/lib/elasticsearch";

//const elasticClient = getClient()

export class PrismaClientsRepository implements ClientsRepository {

    async findMany(): Promise<Client[] | null> {
        const clients = await prisma.client.findMany({
            where: {
                deleted: false
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return clients
    }

    async findById(id: string): Promise<Client | null> {
        const client = await prisma.client.findUnique({
            where: {
                id,
            },
        })

        return client
    }

    async findByDocument(document: string): Promise<Client | null> {
        const client = await prisma.client.findFirst({
            where: {
                AND: [
                    { document },
                    { deleted: false },
                ],
            },
        })

        return client
    }


    async create(clientToBeCreated: CreateClientUseCaseRequest): Promise<Client> {
        const addressExist = await prisma.address.findFirst({
            where: {
                AND: [
                    { street: clientToBeCreated.address.street },
                    { number: clientToBeCreated.address.number },
                    { cep: clientToBeCreated.address.cep },
                    { neighborhood: clientToBeCreated.address.neighborhood },
                    { city: clientToBeCreated.address.city },
                ],
            }
        })

        if (!addressExist) {
            const address = await prisma.address.create({
                data: clientToBeCreated.address
            })

            // await elasticClient.index({
            //     index: "address",
            //     id: address.id,
            //     body: address,
            // });

            const client = await prisma.client.create({
                data: {
                    name: clientToBeCreated.name,
                    type: clientToBeCreated.type,
                    document: clientToBeCreated.document,
                    birthDate: clientToBeCreated.birthDate,
                    addressId: address.id,
                }
            })

            // await elasticClient.index({
            //     index: "clients",
            //     id: client.id,
            //     body: {
            //         id: client.id,
            //         name: clientToBeCreated.name,
            //         type: clientToBeCreated.type,
            //         document: clientToBeCreated.document,
            //         birthDate: clientToBeCreated.birthDate,
            //         addressId: address.id,
            //         routerId: client.routerId,
            //         active: client.active,
            //         deleted: client.deleted,
            //         createdAt: client.createdAt,
            //         updatedAt: client.updatedAt
            //     },
            // });
            return client
        }


        const client = await prisma.client.create({
            data: {
                name: clientToBeCreated.name,
                type: clientToBeCreated.type,
                document: clientToBeCreated.document,
                birthDate: clientToBeCreated.birthDate,
                addressId: addressExist.id,
            }
        })

        // await elasticClient.index({
        //     index: "clients",
        //     id: client.id,
        //     body: {
        //         id: client.id,
        //         name: clientToBeCreated.name,
        //         type: clientToBeCreated.type,
        //         document: clientToBeCreated.document,
        //         birthDate: clientToBeCreated.birthDate,
        //         addressId: addressExist.id,
        //         routerId: client.routerId,
        //         active: client.active,
        //         deleted: client.deleted,
        //         createdAt: client.createdAt,
        //         updatedAt: client.updatedAt
        //     },
        // });

        return client
    }


    async update(clientToBeUpdated: UpdateClientUseCaseRequest): Promise<Client> {

        const clientExists = await prisma.client.findUnique({
            where: {
                id: clientToBeUpdated.id,
            },
        })



        const address = await prisma.address.update({
            where: {
                id: clientExists?.addressId
            },
            data: {
                street: clientToBeUpdated.address?.street,
                number: clientToBeUpdated.address?.number,
                cep: clientToBeUpdated.address?.cep,
                neighborhood: clientToBeUpdated.address?.neighborhood,
                city: clientToBeUpdated.address?.city,
            }
        })

        // await elasticClient.update({
        //     index: "address",
        //     id: address.id,
        //     body: {
        //         doc: {
        //             street: clientToBeUpdated.address?.street,
        //             number: clientToBeUpdated.address?.number,
        //             cep: clientToBeUpdated.address?.cep,
        //             neighborhood: clientToBeUpdated.address?.neighborhood,
        //             city: clientToBeUpdated.address?.city,
        //         },
        //     },
        // });

        const client = await prisma.client.update({
            where: {
                id: clientToBeUpdated.id
            },
            data: {
                name: clientToBeUpdated.name,
                type: clientToBeUpdated.type,
                document: clientToBeUpdated.document,
                birthDate: clientToBeUpdated.birthDate,
                addressId: clientExists?.addressId,
            }
        })

        // await elasticClient.update({
        //     index: "clients",
        //     id: clientToBeUpdated.id,
        //     body: {
        //         doc: {
        //             name: clientToBeUpdated.name,
        //             type: clientToBeUpdated.type,
        //             document: clientToBeUpdated.document,
        //             birthDate: clientToBeUpdated.birthDate,
        //             addressId: clientExists?.addressId,
        //         },
        //     },
        // });

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

        const routerId = client.routerId;

        await prisma.client.update({
            where: {
                id
            },
            data: {
                deleted: true,
                active: false,
                routerId: null
            }
        });

        // await elasticClient.delete({
        //     index: 'clients',
        //     id: id
        // })


        if (routerId !== null) {

            const clientsInRouter = await prisma.client.count({
                where: {
                    routerId
                }
            });

            if (clientsInRouter === 0) {

                await prisma.router.update({
                    where: {
                        id: routerId
                    },
                    data: {
                        active: false
                    }
                });
            }
        }

        return client;
    }


}