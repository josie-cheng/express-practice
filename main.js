var express = require('express');
var app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var articles = [
    {
        id: 1,
        title: 'Article 1',
        body: 'body 1'
    },
    {
        id: 2,
        title: 'Article 2',
        body: 'body 2'
    }
]

app.get('/', function (req, res) {
  res.send(articles);
});

app.post('/articles', function (req, res) {
    const title = req.body.title
    const body = req.body.body

    articles.push({
        id: articles.length + 1,
        title,
        body
    })

    return res.send('ok')
})

app.patch('/articles/:id', function (req, res) {
    const id = req.params.id
    const title = req.body.title
    const body = req.body.body

    for (const article of articles) {
        if (article.id == id) {
            article.title = title
            article.body = body
            break
        }
    }
    return res.send('ok')
})

app.delete('/articles/:id', function (req, res) {
    const id = parseInt(req.params.id)
    const index = articles.map(article => article.id).indexOf(id)
    console.log(index)
    articles.splice(index, 1)
    return res.send('ok')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});