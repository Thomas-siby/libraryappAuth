const express = require("express");
const app = express();
const session = require('express-session');
const  mongoose = require('mongoose')
const MongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');
const UserModel = require('./src/model/User');
const mongoURI='mongodb://localhost:27017/library'

mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
})

.then((res) =>{
    console.log("mongodb connected");
});

const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'mySessions',
});
// const isAuth= (req,res,next)=>{
//     if(req.session!=undefined){
//         next()

//     }
//     else{
//         res.redirect('/login');
//     }
// }

const nav = [ 
    {link : '/books' , name : 'Books'},
    {link : '/authors' , name : 'Authors'},
    {link : '/signup' , name : 'Sign Up'},
    {link : '/login' , name : 'Login'},
    {link : '/admin_book' , name : 'Add New Book'},
    {link : '/admin_author' , name : 'Add New Author'}
]

const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav);
const adminbookRouter = require('./src/routes/adminbookRoutes')(nav);
const adminAuthorRouter = require('./src/routes/adminAuthorRoutes')(nav);
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine' , 'ejs');
app.set('views' , __dirname+'/src/views');
app.use('/books' , booksRouter);
app.use('/admin_book',adminbookRouter);
app.use('/authors' , authorsRouter);
app.use('/admin_author',adminAuthorRouter);
app.use(express.urlencoded({extended:true}));
app.use(session({

    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store,
    
  
}));

app.get('/' , (req,res)=>{
    // req.session.isAuth = true;
    res.render("index" , 
        {nav,
        title : 'Library'
        });
})

app.get('/signup' , (req,res)=>{
    res.render("signup" , 
        {nav,
        title : 'Library'
        });
})

app.post("/signup",async(req,res)=>{
    const { username, email, password,firstname,lastname,phone} = req.body;
    let user = await UserModel.findOne({email});
    if(user){
         
        
        return res.redirect('/signup');
    
    }
    
    const hashedPsw = await bcrypt.hash(password,12);

    user = new UserModel({
        username,
        email,
        password:hashedPsw,
        firstname,
        lastname,
        phone

    });
    await user.save();

    res.redirect('/login');
});
app.get('/login' , (req,res)=>{

    res.render("login" , 
        {nav,
        title : 'Library'
        });
})

app.post("/login",async(req,res)=>{
    const { username, password} = req.body;


    const user = await UserModel.findOne({username});
    if(!user){
        return res.redirect('/login');

    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.redirect('/login')
    }

//    req.session.isAuth =true;
   res.redirect('/books');
    
   
});

app.listen(port,()=>{console.log("Server Ready at "+port)});