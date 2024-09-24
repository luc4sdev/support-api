import { makeDeleteClientUseCase } from '@/use-cases/factories/client/make-delete-client-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"


export const deleteClientBodySchema = z.object({
    id: z.string().uuid(),
})

export async function deleteClient(request: FastifyRequest, reply: FastifyReply) {

    const { id } = deleteClientBodySchema.parse(request.body)


    try {

        const deleteClientUseCase = makeDeleteClientUseCase()

        const data = await deleteClientUseCase.execute({ id })

        return reply.status(200).send(data.client)

    } catch (err) {
        throw err
    }

}