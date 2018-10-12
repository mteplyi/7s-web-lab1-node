import 'dotenv/config';
import express from 'express';
import userAgent from 'express-useragent';
import logger from './logger';

const PORT = process.env.PORT || 3000;
const LOG_PATH = process.env.LOG_PATH || './access.log';
const LOG_TEMPLATE = process.env.LOG_TEMPLATE || '';

const app = express();

app.use(userAgent.express());
app.use(logger(LOG_PATH, LOG_TEMPLATE));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
