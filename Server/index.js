const express = require('express')
const app = express()

app.use(cors({
    Credential: true,
    origin:'http://127.0.0.1:5173/',
}));

app.get('/test',(req,res)=>{
    res.json('test ok');
});

app.listen(4000);