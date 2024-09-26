import { app } from "./app";
import { env } from "./env";
import fs from 'fs';
import path from 'path';


const tmpDir = env.IMAGE_DIRECTORY || path.join(__dirname, '../tmp/');

if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
    console.log(`Pasta ${tmpDir} criada.`);
}

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log('HTTP Server Running!');
});
