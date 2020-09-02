const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const Article = require('./models/article')


// Environment variables
const APP_PORT = process.env.APP_PORT || 5000
const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const MONGO_PORT = process.env.MONGO_PORT || '27017'
const MONGO_DB = process.env.MONGO_DB || 'markdownblog'

// Connecting to db
mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// Init
const app = express()

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