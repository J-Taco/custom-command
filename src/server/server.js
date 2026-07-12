import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/api.js';

const PORT = 4242;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);
app.listen(PORT, () => console.log(`UI running at http://localhost:${PORT}`));