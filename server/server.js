const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();



//app
const app = express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( ()=>console.log('database connected')).catch((error)=>console.log(error));

const PORT = process.env.PORT;

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

//import routes

readdirSync('./routes').map(r=>{
    app.use('/api', require(`./routes/${r}`));
});

app.listen(port, ()=>console.log(`server running in ${PORT} port`));