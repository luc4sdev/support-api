import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateClientUseCase } from '@/use-cases/factories/client/make-create-client-use-case';
import { z } from "zod"
import { ClientAlreadyExistsError } from '@/use-cases/errors/client-already-exists-error';

const AddressSchema = z.object({
    street: z.string(),
    number: z.string(),
    cep: z.string(),
    neighborhood: z.string(),
    city: z.string(),
});

export const createClientBodySchema = z.object({
    name: z.string(),
    type: z.enum(['FISICA', 'JURIDICA']),
    document: z.string(),
    birthDate: z.string(),
    address: AddressSchema
})

export async function createClient(request: FastifyRequest, reply: FastifyReply) {

    const { name, type, document, birthDate, address } = createClientBodySchema.parse(request.body)


    try {

        const createClientUseCase = makeCreateClientUseCase()


        const data = await createClientUseCase.execute({ name, type, document, birthDate, address })

        return reply.status(201).send(data.client)

    } catch (err) {
        if (err instanceof ClientAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }
        throw err
    }

}