
import { makeGetClientUseCase } from '@/use-cases/factories/client/make-get-client-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

interface Request {
    clientId: string
}
export async function getClient(request: FastifyRequest, reply: FastifyReply) {
    const req = await request.params as Request;
    const clientId = req.clientId

    const getClient = makeGetClientUseCase()

    const client = await getClient.execute({
        clientId
    })

    return reply.status(200).send(client)
}