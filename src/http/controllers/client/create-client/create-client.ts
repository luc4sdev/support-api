import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateClientUseCase } from '@/use-cases/factories/client/make-create-client-use-case';
import { z } from "zod"
import { ClientAlreadyExistsError } from '@/use-cases/errors/client-already-exists-error';


export const createClientBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().nullish(),
    image: z.string().nullish(),
})

export async function createClient(request: FastifyRequest, reply: FastifyReply) {

    const { name, email, phone, image } = createClientBodySchema.parse(request.body)


    try {

        const createClientUseCase = makeCreateClientUseCase()


        const data = await createClientUseCase.execute({ name, email, phone, image })

        return reply.status(201).send(data.client)

    } catch (err) {
        if (err instanceof ClientAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }
        throw err
    }

}