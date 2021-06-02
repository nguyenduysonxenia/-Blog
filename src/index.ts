import express from 'express';
const app: express.Application = express();
import bodyParser from 'body-parser';
import cors  from 'cors'
import connectDb from './config/db';
import dotenv from 'dotenv';
import router from './routes/mainRouter';
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
connectDb();

router(app);

app.listen(process.env.SERVER_PORT,()=>console.log('server runing'));
