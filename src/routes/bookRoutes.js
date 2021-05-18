const express = require("express");
const booksRouter = express.Router();
const Bookdata = require('../model/Bookdata');

booksRouter.use(express.static('./public'));
// const isAuth= (req,res,next)=>{
//     if(req.session!=undefined){
//         next()
//     }
//     else{
//         res.redirect('/login');
//     }
// }

function book_fn(nav){
    // var books = [
    //     {
    //         title : "Life of Pi" , 
    //         author : "Yann Martel" , 
    //         genre : "Novel, Adventure fiction, Psychological Fiction, Philosophical fiction" ,
    //         img : "lifeofpi.jpg",
    //         summary: "A young man who survives a disaster at sea is hurtled into an epic journey of adventure and discovery. While cast away, he forms an unexpected connection with another survivor: a fearsome Bengal tiger. In Canada, a writer visits the Indian storyteller Pi Patel and asks him to tell his life story."
    //     },
    //     {
    //         title : "Alice's Adventures in Wonderland" , 
    //         author : "Lewis Carroll" , 
    //         genre : "Novel, Children's literature, Fantasy Fiction, Literary nonsense, Absurdist fiction, Fantastique" ,
    //         img : "alice.jpg",
    //         summary: "Alice the protagonist must find her way through this strange place called 'Wonderland'.She is a 7 year old girl who while sitting with her sisters falls asleep and enters this world by falling down a rabbit hole. She follows the White Rabbit who leads her on many adventures throughout the book"
    //     },
    //     {
    //         title : "Pinocchio" , 
    //         author : "Carlo Collodi" , 
    //         genre : "Fiction, literature, fantasy, children's book, adventure" ,
    //         img : "pinocchio.jpg",
    //         summary: "The central theme of “Pinocchio” is personality development, maturation, and the personal trip from beeing evil to beeing good. Experiencing the psychological transformation of the main character Pinocchio who is the mischievous wooden puppet, and eventually becomes a good boy."
    //     },
    //     {
    //         title : "Harry Potter and the Philosopher's Stone" , 
    //         author : "J. K. Rowling" , 
    //         genre : "Novel, Children's literature, Fantasy Fiction, High fantasy" ,
    //         img : "harrypotter.jpg",
    //         summary: "Harry Potter and the Philosopher's Stone is an enthralling start to Harry's journey toward coming to terms with his past and facing his future. It was the first book written by Rowling, and she was praised for creating well-rounded characters and a fully realized wizard universe that coexisted with the present world."
    //     },
    //     {
    //         title : "The Lord of the Rings" , 
    //         author : "J. R. R. Tolkien" , 
    //         genre : "Novel, Fantasy Fiction, High fantasy, Chivalric romance, Adventure fiction, Heroic fantasy" ,
    //         img : "lordofrings.jpg",
    //         summary: "The novel, set in the Third Age of Middle-earth, formed a sequel to Tolkien's The Hobbit (1937) and was succeeded by his posthumous The Silmarillion (1977). The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil."
    //     },
    // ] 

     
    booksRouter.get('/' ,(req,res)=>{
        Bookdata.find()
        .then(function(books){
            res.render("books" , {
                nav,
                title : 'Books',
                books
            });
        })
        
    });
   
    booksRouter.get('/:id' , function(req,res){
        const id = req.params.id; 
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render("book" , {
                nav,
                title : 'Book',
                book
            });
        })
        
    });

    booksRouter.get('/updatebook/:id' , function(req,res){
        const id = req.params.id; 
        Bookdata.findOne({_id:id})
        .then(function(books){
            res.render("updatebook" , {
                nav,
                title : 'updatebook',
                books
            });
        })
        
    });
    booksRouter.get('/deletebook/:id' , function(req,res){
        const id = req.params.id; 
        Bookdata.findOne({_id:id}).deleteOne().exec();
        console.log(id);
        res.redirect('/books');
        
    });
    
    return booksRouter;
}


module.exports = book_fn;