import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';
import cors  from 'cors';

// routes 
import routes from './routes/index.js';

const port = config.service.port || 3000;

// 1. Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//fix for cors policy issues
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
}));

// 2. Require our routes into the application.

app.use("/api", routes);
app.get('*', (req, res) => res.status(200).send({
  
}));

// 3. Server listen to port

app.listen(port, async () => {
 
try{
  console.log(`App running on port ${port}.`);
}catch(err){
  console.log(err);
}
})

export default app;