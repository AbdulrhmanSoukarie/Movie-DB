const express = require('express');
const router = express.Router();
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



router.route('/create')
.post((req , res)=> {
     
    const title = req.query.title;
    const year = req.query.year;
    const rating = req.query.rating;
    if(title !== "" && parseInt(year) !== "" && isNaN(year) == false &&
    year.match(/^\d{4}$/))
     {
    if (!rating){
        movies.push({ title: title, year: year, rating: 4} )
    }
      else{  movies.push({ title: title, year: year, rating: rating} );}

        res.send({status:200 , data:movies})}
     
    else{
        res.send({   status:403, error:true, message:'you cannot create a movie without providing a title and a year'})}
});
router.route('/read')
.get((req ,res)=>{
    res.send({status:200, data: movies});
});

router.route('/read/by-date')
.get((req ,res)=>{
    res.send({status:200, data: sortedActivities});
});

router.route('/read/by-rating')
.get((req ,res)=>{
    res.send({status:200, data: sortedRate});
});
router.route('/read/by-title')
.get((req ,res)=>{
    res.send({status:200, data: sortedTitle});
});
router.route('/read/id/:id')
.get((req ,res)=>{
    const idx = (req.params['id'] - 1)
  
   if (idx >= 0 && idx < movies.length){
  
    res.send({status:200, data: movies[idx]})};
   
     {
       res.status(404).send({status:404, error:true, message:'the movie <ID> does not exist'});
      
    }
        
    
});

router.route('/update/:id')
.put((req , res)=>{

    const idx = req.params['id'] -1;
   
    const title = req.query.title;
    const year = req.query.year;
    const rating = req.query.rating;
    if(idx >= 0 && idx < movies.length){

    if (title && title != ""){movies[idx].title = title
    };
    if (year  && parseInt(year) !== "" && isNaN(year) == false &&
    year.match(/^\d{4}$/)) {movies[idx].year = year}

    if(rating && rating != " "){movies[idx].rating = rating}
     
    res.status(200).send({
        status:200,
        data: movies[idx]
        
    })}

    else {
         res.send({message : "invalid Id"})
    }
    
}
);

router.route ('/delete/id/:id')

.delete((req , res)=>{
    const idx = req.params['id'] - 1 ;
    if (idx >= 0 && idx< movies.length){

        movies.splice(idx, 1)
        res.send({status:200, data: movies})}
    
        {
           res.status(404).send({status:404, error:true, message:'the movie <ID> does not exist'})
        }
   res.send();
})


 module.exports = router;