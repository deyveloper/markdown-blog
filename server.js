const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const Article = require('./models/article')


// Connecting to db
mongoose.connect('mongodb://localhost:27017/markdownblog', { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// Init
const app = express()

// Environment variables
const APP_PORT = process.env.APP_PORT || 5000

// Choose the view engine
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })

    res.render('articles/index', { articles })
})

app.use('/articles', articleRouter)


app.listen(APP_PORT)