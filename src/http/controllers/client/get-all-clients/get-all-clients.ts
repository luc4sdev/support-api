import { makeGetAllClientsUseCase } from '@/use-cases/factories/client/make-get-all-clients-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from "zod"

export const getAllClientsParamsSchema = z.object({

    query: z.string().nullish(),
    pageIndex: z.string().nullable().default('0').transform(Number)

})

export async function getAllClients(req: FastifyRequest, reply: FastifyReply) {
    const { query, pageIndex } = getAllClientsParamsSchema.parse(req.query);

    const getClient = makeGetAllClientsUseCase()

    const clients = await getClient.execute({ query, pageIndex })
    return reply.status(200).send(clients)
}