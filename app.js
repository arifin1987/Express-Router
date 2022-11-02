const express = require('express');



app = express();
const studentRouter = require('./routers/studentRouter')

app.use(express.json());

app.use('/api/students', studentRouter);



app.listen(8000, ()=>{
    console.log("server run success");
})


