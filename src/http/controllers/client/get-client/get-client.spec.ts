import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('Get Client (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to get client', async () => {

        const data = await request(app.server).post('/client').send({
            name: "John Doe",
            type: "FISICA",
            document: "123.123.123-12",
            birthDate: "13/10/2002",
            address: {
                street: "street 3",
                number: "11",
                cep: "74000",
                neighborhood: "bairro ABC",
                city: "Goiânia",
            }
        })

        const response = await request(app.server).get(`/client/${data.body.id}`).send()

        expect(response.statusCode).toEqual(200)
    })
})