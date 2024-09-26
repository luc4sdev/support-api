import { app } from "./app";
import { env } from "./env";
import { prisma } from "./lib/prisma";

async function createUser() {
    (await prisma.user.findMany()).length === 0 ? await prisma.user.create({ data: { name: 'Admin', email: 'admin@email.com', password: 'admin123' } }) : () => { }
}
createUser()
app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log('HTTP Server Running!');
});
