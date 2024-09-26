import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import path from 'path';
import { makeUploadImageUseCase } from '@/use-cases/factories/client/make-upload-image-use-case';
import { makeGetImageUseCase } from '@/use-cases/factories/client/make-get-image-use-case';


export const uploadImageSchema = z.object({
    id: z.string(),
});

export const getImageSchema = z.object({
    id: z.string(),
});

export async function uploadImage(request: FastifyRequest, reply: FastifyReply) {
    const { id } = uploadImageSchema.parse(request.params);

    try {

        const data = await request.file();
        if (!data) {
            return reply.status(400).send({ error: 'Missing file input.' })
        }

        if (data && data.file) {
            const extension = path.extname(data.filename)
            const baseName = path.basename(data.filename, extension)
            const buffer = await data.toBuffer()

            const uploadImage = makeUploadImageUseCase();
            const clientData = await uploadImage.execute({ id, baseName, extension, buffer });

            return reply.status(200).send(clientData.client);


        } else {
            return reply.status(400).send({ message: 'Error uploading file' });
        }
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}


export async function getImage(request: FastifyRequest, reply: FastifyReply) {
    const { id } = getImageSchema.parse(request.params);

    try {
        const getImage = makeGetImageUseCase();
        const imageBuffer = await getImage.execute({ id });

        if (imageBuffer) {
            const base64String = imageBuffer.toString('base64');
            const dataUrl = `data:image/png;base64,${base64String}`;

            reply.status(200).send(dataUrl);
        } else {
            reply.status(404).send('Image not found');
        }

    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}

