import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('Get All Clients (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to get all clients', async () => {

        const response = await request(app.server).get('/get-clients').send()

        expect(response.statusCode).toEqual(200)
    })
})