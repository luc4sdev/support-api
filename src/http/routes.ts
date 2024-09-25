import { FastifyInstance } from "fastify";
import { createClient, createClientBodySchema } from "./controllers/client/create-client/create-client";
import { getClient } from "./controllers/client/get-client/get-client";
import { getAllClients } from "./controllers/client/get-all-clients/get-all-clients";
import { updateClient, updateClientBodySchema } from "./controllers/client/update-client/update-client";
import { deleteClient, deleteClientBodySchema } from "./controllers/client/delete-client/delete-client";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { getImage, uploadImage } from "./controllers/client/upload-image/upload-image";

export async function appRoutes(app: FastifyInstance) {

    // Clients routes

    app.withTypeProvider<ZodTypeProvider>().post(
        '/client',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Create a new client',
                body: createClientBodySchema,
                response: {
                    201: z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string().email(),
                        phone: z.string().nullish(),
                        image: z.string().nullish(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                    })
                }
            },
        }, createClient)

    app.withTypeProvider<ZodTypeProvider>().get(
        '/get-clients',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Get all clients',
                response: {
                    200: z.object({
                        data: z.array(z.object({
                            id: z.string(),
                            name: z.string(),
                            email: z.string().email(),
                            phone: z.string().nullish(),
                            image: z.string().nullish(),
                            createdAt: z.date(),
                            updatedAt: z.date(),
                            deleted: z.boolean().nullable(),
                        })),
                        total: z.number()
                    })

                }
            },
        }, getAllClients)

    app.withTypeProvider<ZodTypeProvider>().get(
        '/client/:clientId',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Get client',
                response: {
                    200: z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string().email(),
                        phone: z.string().nullish(),
                        image: z.string().nullish(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                    })
                }
            },
        }, getClient)


    app.withTypeProvider<ZodTypeProvider>().put(
        '/update-client',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Update client',
                body: updateClientBodySchema,
                response: {
                    200: z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string().email(),
                        phone: z.string().nullish(),
                        image: z.string().nullish(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                    })
                }
            },
        }, updateClient)

    app.withTypeProvider<ZodTypeProvider>().put(
        '/delete-client',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Delete client',
                body: deleteClientBodySchema,
                response: {
                    200: z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string().email(),
                        phone: z.string().nullish(),
                        image: z.string().nullish(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                    })
                }
            },
        }, deleteClient)


    app.withTypeProvider<ZodTypeProvider>().post(
        '/client/upload/:id',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Upload a client Image',
                response: {
                    200: z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string().email(),
                        phone: z.string().nullish(),
                        image: z.string().nullish(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        deleted: z.boolean().nullable(),
                    })
                }
            },
        }, uploadImage)


    app.withTypeProvider<ZodTypeProvider>().get(
        '/client/image/:id',
        {
            schema: {
                tags: ['Clients'],
                summary: 'Get a client Image',
                response: {
                    200: z.object({
                        imageBuffer: z.instanceof(Buffer)
                    })
                }
            },
        }, getImage)
}