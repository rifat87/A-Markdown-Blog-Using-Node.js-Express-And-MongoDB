const express = require('express');
//adding mongodb
const mongoose = require('mongoose');
//access the models article.js for home page
const Article = require('./models/article')

const articleRouter = require('./routes/articles');

//importing method overrde
const methodOverride = require('method-override')
const app = express();

//connecting the database
mongoose.connect('mongodb://localhost/blog');

//demo home router
const homeRouter = require('./routes/home.js');
app.use('/home', homeRouter);

//ejs for HTML using javascript
app.set('view engine', 'ejs');

//access the new article object
app.use(express.urlencoded({extended: false}))

// use override method
app.use(methodOverride('_method'))

app.get('/', async (req,  res) =>{
    //Articles variable which have our page formating data and we are going to show it in our index.ejs file.
    const articles = await Article.find().sort({
        createdAt: 'desc' })
    res.render('articles/index', {articles: articles});// here the text is a variable which stores the value and prints it to index.ejs file as variable print, <%= text %>
})

// accessing routes -> article.js using articleRouter
app.use('/articles', articleRouter);

app.listen(5000);