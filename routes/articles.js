const express = require('express')
const router = express.Router()
const { saveArticleAndRedirect } = require('./helpers')

// Models
const Article = require('./../models/article')


router.get('/new', (req, res) => {
    res.render('articles/new', { article: { title: '', description: '', markdown: '' } })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article === null) res.redirect('/')
    res.render('articles/show', { article })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()  
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router