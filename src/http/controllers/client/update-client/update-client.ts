import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeUpdateClientUseCase } from '@/use-cases/factories/client/make-update-client-use-case';




export const updateClientBodySchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().nullish(),
    image: z.string().nullish(),
})

export async function updateClient(request: FastifyRequest, reply: FastifyReply) {

    const { id, name, email, phone, image } = updateClientBodySchema.parse(request.body)


    try {

        const updateClientUseCase = makeUpdateClientUseCase()

        const data = await updateClientUseCase.execute({ id, name, email, phone, image })

        return reply.status(200).send(data.client)

    } catch (err) {
        throw err
    }



}