const express = require('express');
const route = express.Router();
const NewsService = require('./news.service');

route.get('/news', (req, res) => {
    //NewsService.getNyheter(req, res);
    res.send(200, [
        {"id": 55, "Title": "Nyhet 1", "Innehall": "Hej Hej Hej Hej Hej"}
    ]);
});

route.post('/news', (req, res) =>{
    NewsService.postNews(req, res);
});

route.put('/new/:id', (req, res) =>{
    NewsService.putNews(req, res);
});

route.delete('/new', (req, res) =>{
    NewsService.deleteNews(req, res);
});

module.exports = route;