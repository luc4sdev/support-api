import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export class ApiController {

    public static async validateToken(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { token } = req.body as { token: string };
            const cleanedToken = token.replace(/^"(.*)"$/, '$1');

            if (!cleanedToken) {
                return reply.status(401).send({ error: 'No token provided' });
            }

            jwt.verify(cleanedToken, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
                if (err) {
                    return reply.status(401).send({ error: 'Invalid token' });
                } else {
                    const user = {
                        id: decoded.id,
                        email: decoded.email,
                        name: decoded.name,
                    };

                    return reply.status(200).send(user);
                }
            });
        } catch (error) {
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    }


    public static async authenticate(req: FastifyRequest, reply: FastifyReply) {
        const { email, password } = req.body as { email: string; password: string };
        try {
            if (!email || !password) {
                return reply.status(400).send({ error: 'Email and password are required' });
            }

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return reply.status(404).send({ error: 'Invalid email or password' });
            }

            if (user.password !== password) {
                return reply.status(404).send({ error: 'Invalid email or password' });
            }


            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
                process.env.JWT_SECRET as string,
                { expiresIn: '12h' }
            );

            user.password = '';

            reply.setCookie('token', token, {
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 12, // 12 horas
                path: '/',
            });
            return reply.send({ user, token });
        } catch (error) {
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    public static async destroy(req: FastifyRequest, reply: FastifyReply) {
        const { token } = req.body as { token: string };
        const cleanedToken = token.replace(/^"(.*)"$/, '$1');
        if (!cleanedToken) {
            return reply.status(401).send({ error: 'No token provided' });
        }

        try {
            jwt.verify(cleanedToken, process.env.JWT_SECRET as string);
        } catch (e) {
            return reply.status(401).send({ error: 'Invalid token' });
        }

        reply.clearCookie('token');
        return reply.send({ message: 'Logout successfully' });
    }

}
