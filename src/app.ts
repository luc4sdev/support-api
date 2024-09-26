import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from '@fastify/multipart';

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyMultipart, {
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Support App',
            description: 'Full-Stack App.',
            version: '1.0.0',
        }
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.register(fastifyCors, {
    origin: ['https://support-app-neon.vercel.app', 'http://localhost:3000']
})
app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    }
    else { }

    return reply.status(500).send({ message: 'Internal server error.' })
})