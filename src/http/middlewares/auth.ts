import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
    public static async authMiddleware(req: FastifyRequest, reply: FastifyReply) {
        // Extraindo o token do cookie
        const token = req.cookies['token'];

        if (token) {
            try {
                jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
                    if (err) {
                        // Token inválido
                        return reply.status(401).send({ error: 'Invalid token' });
                    }

                    // Token válido, cria um novo token e redefine o cookie
                    const newToken = jwt.sign(
                        {
                            id: decoded.id,
                            email: decoded.email,
                            name: decoded.name,
                            isAdmin: decoded.isAdmin,
                            role: decoded.role,
                        },
                        process.env.JWT_SECRET as string,
                        { expiresIn: '1h' }
                    );

                    // Redefine o cookie com o novo token
                    reply.setCookie('token', newToken, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 1000 * 60 * 60, // 1 hora
                        path: '/',
                    });

                    // Continua o processamento da requisição
                    return;
                });
            } catch (error) {
                // Se houver um erro ao verificar o token
                return reply.status(401).send({ error: 'Invalid token' });
            }
        } else {
            // Nenhum token foi fornecido
            return reply.status(401).send({ error: 'Token was not provided' });
        }
    }
}
