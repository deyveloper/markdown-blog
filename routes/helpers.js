 saveArticleAndRedirect = (path) => {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title,
        article.description = req.body.description,
        article.markdown = req.body.markdown
    
        try {
            await article.save()
        } catch (error) {
            res.render(`articles/${path}`, { article })
        }
    
        return res.redirect(`/articles/${article.slug}`)
    }
}

module.exports = { saveArticleAndRedirect }