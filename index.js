const express = require('express');

const app = express();


app.get('/',function(req, res){
    res.send('Ok');
})
.post((req, res) => {});
app.listen(3000,function(){
    console.log('server started on port 3000...')
});

 app.route('/test')
 .get((req , res) => {
     res.send({status : 200 , message : 'ok'})
 })
 .post ((req , res ) => {
     console.log("yaw yaw ")
 });
 app.route('/time')
 .get((req , res) => {
     res.send({status : 200 , message :new Date().getHours() + ":" + new Date().getMinutes()})
 })
 .post ((req , res ) => {
     console.log("yaw yaw ")
 });
 
app.route("/Hello/:id")
.get((req , res) => { 
    res.send({Status: 200 ,
        message :'hello ' + req.params.id});
})
.post((req , res) => { 
    console.log("hello world" )
})