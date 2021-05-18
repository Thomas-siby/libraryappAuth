const express = require('express');
const adminAuthorRouter = express.Router();
const AuthorData = require('../model/Authordata');

function router(nav){
    adminAuthorRouter.get('/',function(req,res){
        res.render('newauthor',{
            nav,
            title: 'Add New Author'
        })
    })
    
    
    adminAuthorRouter.post('/add',function(req,res){
        var item = {
            name : req.body.name,
            description : req.body.description,
            genre : req.body.genre,
            about : req.body.about,
            image : req.body.image
        }
        var author = AuthorData(item);
        author.save();//save into database
        res.redirect('/authors');
    });

    return adminAuthorRouter;
}
module.exports = router;