import express from 'express';
const app: express.Application = express();
import bodyParser from 'body-parser';
import cors  from 'cors'
import connectDb from './config/db';
import dotenv from 'dotenv';
import router from './routes/mainRouter';
import path  from 'path'
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'/public')));
connectDb();
app.get('/',(req,res)=>res.send('hhhh'))
router(app);

const Port = process.env.PORT ? process.env.PORT : 3001;
app.listen(Port,()=>console.log('server runing'));
