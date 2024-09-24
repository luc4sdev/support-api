import { makeGetAllClientsUseCase } from '@/use-cases/factories/client/make-get-all-clients-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'


export async function getAllClients(__: FastifyRequest, reply: FastifyReply) {

    const getClient = makeGetAllClientsUseCase()

    const clients = await getClient.execute()

    return reply.status(200).send(clients)
}