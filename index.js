const express = require('express');

const app = express();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];

const sortedActivities = movies.slice().sort((a, b) => b.year - a.year);
const sortedRate  = movies.slice().sort((a, b) => b.rating - a.rating);
const sortedTitle = movies.sort((a, b) => {
    var textA = a.title.toLowerCase();
    var textB = b.title.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});


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

app.route('/movies/read/by-date')
.get((req ,res)=>{
    res.send({status:200, data: sortedActivities});
});

app.route('/movies/read/by-rating')
.get((req ,res)=>{
    res.send({status:200, data: sortedRate});
});
app.route('/movies/read/by-title')
.get((req ,res)=>{
    res.send({status:200, data: sortedTitle});
});
app.route('/movies/read/id/:id')
.get((req ,res)=>{
    const idx = (req.params['id'] - 1)
  
   if (idx >= 0 && idx < movies.length){
  
    res.send({status:200, data: movies[idx]})};
   
     {
       res.status(404).send({status:404, error:true, message:'the movie <ID> does not exist'});
      
    }
        
    
});

app.route('/movies/update/:id')
.get((req , res)=>{

    const idx = req.params['id'] -1;
   
    const title = req.query.title;
    const year = req.query.year;
    const rating = req.query.rating;
    if(idx >= 0 && idx < movies.length){
    if (title && title != ""){movies[idx].title = title}
    if (year  && parseInt(year) !== "" && isNaN(year) == false &&
    year.match(/^\d{4}$/)) {movies[idx].year = year}
    else{
        res.send({message : "invalid year"})
    }

    if(rating && rating != " "){movies[idx].rating = rating}
     
    res.send({
        status:200,
        data: movies[idx]
        
    })}

    else {
                 res.send({message : "invalid Id"})
    }
    
}
);

app.route ('/movies/delete/id/:id')

.get((req , res)=>{
    const idx = req.params['id'] - 1 ;
    if (idx > 0 && idx< movies.length){

        movies.splice(idx, 1)
        res.send({status:200, data: movies})}
    
        {
           res.status(404).send({status:404, error:true, message:'the movie <ID> does not exist'})
        }
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
app.route("/add")
.get((req ,res )=> {
    
    const title = req.query.title;
    const year = req.query.year;
    const rating = req.query.rating;
    if(title !== "" && parseInt(year) !== "" && isNaN(year) == false &&
    year.match(/^\d{4}$/))
     {
    if (rating == ""){
        movies.push({ title: title, year: year, rating: 4} )
    }
      else{  movies.push({ title: title, year: year, rating: rating} );}

        res.send({status:200 , data:movies})}
     
    else{
        res.send({   status:403, error:true, message:'you cannot create a movie without providing a title and a year'})}
});
