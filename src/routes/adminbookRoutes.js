const express = require('express');
const adminbookRouter = express.Router();
const Bookdata = require('../model/Bookdata');

function router(nav){
    adminbookRouter.get('/',function(req,res){
        res.render('newbook',{
            nav,
            title: 'Add New Book'
        })
    })
    
    
    adminbookRouter.post('/add',function(req,res){
        var item = {
            title : req.body.title,
            author : req.body.author,
            genre : req.body.genre,
            summary : req.body.summary,
            image : req.body.image
        }
        var book = Bookdata(item);
        book.save();//save into database
        res.redirect('/books');
    });

    adminbookRouter.post('/update/:id',function(req,res){
        const id = req.params.id; 
        var item = {
            title : req.body.title,
            author : req.body.author,
            genre : req.body.genre,
            summary : req.body.summary,
            image : req.body.image
        }
        console.log(id);
        var book = Bookdata(item);
        book.save({_id:id});
        res.redirect('/books');
    });

    return adminbookRouter;
}
module.exports = router;