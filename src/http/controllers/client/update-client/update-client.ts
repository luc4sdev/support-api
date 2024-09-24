import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeUpdateClientUseCase } from '@/use-cases/factories/client/make-update-client-use-case';


const AddressSchema = z.object({
    street: z.string().optional(),
    number: z.string().optional(),
    cep: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
});

export const updateClientBodySchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    type: z.enum(['FISICA', 'JURIDICA']).optional(),
    document: z.string().optional(),
    birthDate: z.string().optional(),
    address: AddressSchema
})

export async function updateClient(request: FastifyRequest, reply: FastifyReply) {

    const { id, name, type, document, birthDate, address } = updateClientBodySchema.parse(request.body)


    try {

        const updateClientUseCase = makeUpdateClientUseCase()

        const data = await updateClientUseCase.execute({ id, name, type, document, birthDate, address })

        return reply.status(200).send(data.client)

    } catch (err) {
        throw err
    }



}