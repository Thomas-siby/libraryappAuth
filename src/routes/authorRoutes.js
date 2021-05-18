const express = require("express");
const authorsRouter = express.Router();
const Authordata = require('../model/Authordata');

function author_fn(nav){
    // var authors = [
    //     {
    //         name : "J. K. Rowling" , 
    //         description : "British author", 
    //         genre : "Fantasy, drama, young adult fiction, tragicomedy, crime, fiction" ,
    //         img : "rowling.jpg",
    //         summary:"Joanne Rowling (born 31 July 1965), better known by her pen name J. K. Rowling, is a British author, philanthropist, film producer, television producer, and screenwriter. She is best known for writing the Harry Potter fantasy series, which has won multiple awards and sold more than 500 million copies,[2][3] becoming the best-selling book series in history.[4] The books are the basis of a popular film series, over which Rowling had overall approval on the scripts[5] and was a producer on the final films.[6] She also writes crime fiction under the pen name Robert Galbraith."
    //     },
    //     {
    //         name : "Lewis Carroll" , 
    //         description : "English writer" , 
    //         genre : "Children's literature, fantasy literature, mathematical logic, poetry, literary nonsense, linear algebra, voting theory" ,
    //         img : "lewis.jpg",
    //         summary:"Charles Lutwidge Dodgson, better known by his pen name Lewis Carroll, was an English writer of children's fiction, notably Alice's Adventures in Wonderland and its sequel Through the Looking-Glass. He was noted for his facility with word play, logic, and fantasy."
    //     },
    //     { 
    //         name : "Carlo Collodi" , 
    //         description : "Italian author" , 
    //         genre : "Children's literature, Political satire, Journalism" ,
    //         img : "carlo.jpg",
    //         summary:"Collodi, pseudonym of Carlo Lorenzini, (born Nov. 24, 1826, Florence, Tuscany [Italy]—died Oct. 26, 1890, Florence), Italian author and journalist, best known as the creator of Pinocchio, the childlike puppet whose adventures delight children around the world. As a young man Collodi joined the seminary."
    //     },
    //     { 
    //         name : "Yann Martel" , 
    //         description : "Canadian author" , 
    //         genre : "Fiction" ,
    //         img : "yann.jpg",
    //         summary:"Yann Martel is a Canadian author best known for the Man Booker Prize-winning novel Life of Pi, an international bestseller published in more than 50 territories"
    //     },
    //     {
    //         name : "J. R. R. Tolkien" , 
    //         description : "Writer" , 
    //         genre : "Fantasy, high fantasy, mythopoeia, translation, literary criticism" ,
    //         img : "tolkien.jpg",
    //         summary:"John Ronald Reuel Tolkien CBE FRSL was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings."
    //     },
    // ]
    
    authorsRouter.get('/' , function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("authors" , {
                nav,
                title : 'Authors',
                authors
            });
        })
         
    });
  
    authorsRouter.get('/:id' , function(req,res){
        const id = req.params.id; 
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render("author" , {
                nav,
                title : 'Author',
                author
            });
        })
        
    });
    return authorsRouter;
}


module.exports = author_fn;