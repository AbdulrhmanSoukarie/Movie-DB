const express = require('express');
const movies_db = require('./router/movie') ;
const app = express();
app.use('/movies' , movies_db);

app.get('/',function(req, res){
    res.send('Ok');
})




 app.route('/test')
 .get((req , res) => {
     res.send({status : 200 , message : 'ok'})
 })

 app.route('/time')
 .get((req , res) => {
     res.send({status : 200 , message :new Date().getHours() + ":" + new Date().getMinutes()})
 })
 
 
app.route("/Hello/:id")
.get((req , res) => { 
    res.send({Status: 200 ,
        message :'hello ' + req.params.id});
})
app.route("/search")
.get((req ,res )=> {
    const {s}= req.query
    if (s !== ""){
        res.send({status:200, message:"ok", data:s})

    }
    else {
       
        res.status(500).send({status:500, error:true, message:"you have to provide a search"});
    }
});

app.listen(3000,function(){
    console.log('server started on port 3000...')
});