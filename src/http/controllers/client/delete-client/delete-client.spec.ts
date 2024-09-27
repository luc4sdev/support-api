import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('Delete Client (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete client', async () => {

        const data = await request(app.server).post('/client').send({
            name: 'John Doe',
            email: 'johndoe@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        })

        const response = await request(app.server).put('/delete-client').send({ id: data.body.id })

        expect(response.statusCode).toEqual(200)
    })
})