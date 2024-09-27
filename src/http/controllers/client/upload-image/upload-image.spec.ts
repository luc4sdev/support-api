import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('Upload image (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should be able to upload image', async () => {

        const clientResponse = await request(app.server).post('/client').send({
            name: 'John Doe',
            email: 'johndoe@email.com',
            phone: '(99) 99999-9999',
        });

        const clientId = clientResponse.body.id;

        const response = await request(app.server)
            .post(`/client/upload/${clientId}`)
            .attach('file', Buffer.from('mocked-image-content'), 'image.png')


        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('id', clientId);
    });

    it('should return an image as base64 data URL', async () => {

        const clientResponse = await request(app.server).post('/client').send({
            name: 'John Doe',
            email: 'johndoe2@email.com',
            phone: '(99) 99999-9999',
        });

        const clientId = clientResponse.body.id;

        await request(app.server)
            .post(`/client/upload/${clientId}`)
            .attach('file', Buffer.from('mocked-image-content'), 'image.png');


        const response = await request(app.server)
            .get(`/client/image/${clientId}`)
            .send();


        expect(response.text.startsWith('data:image/png;base64,')).toBe(true);
    });
})