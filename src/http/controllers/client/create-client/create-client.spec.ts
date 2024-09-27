import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('Create Client (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to create client', async () => {
        const response = await request(app.server).post('/client').send({
            name: 'John Doe',
            email: 'johndoe@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        })

        expect(response.statusCode).toEqual(201)
    })

    it('should not be able to create client with same email', async () => {
        await request(app.server).post('/client').send({
            name: 'John Doe',
            email: 'johndoe@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        })

        const response = await request(app.server).post('/client').send({
            name: 'John Doe',
            email: 'johndoe@email.com',
            phone: '(99) 99999-9999',
            image: 'image.png'
        })

        expect(response.statusCode).toEqual(409)
    })
})