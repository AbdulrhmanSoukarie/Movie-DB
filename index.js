const express = require('express');

const app = express();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];
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

app.route('/movies/create')
.get((req , res)=> {
    res.send();
});
app.route('/movies/read')
.get((req ,res)=>{
    res.send({status:200, data: movies});
});
app.route('/movies/update')
.get((req , res)=>{
    res.send();
}
);

app.route ('/movies/delete')
.get((req , res)=>{
   res.send();
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
