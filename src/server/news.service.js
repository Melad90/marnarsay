const Nyhet = require('./news-model');

require('./mongoDB').connect();

function getNyheter(req, res) {
    const docquery = Nyhet.find({});
    docquery
    .exec()
    .then(nyheter => {
        res.status(200).json(nyheter);
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

function postNews(req, res) {
    const orginalNews = {id: req.body.id, Title: req.body.Title, Innehall: req.body.Innehall};
    const nyhet = new Nyhet(orginalNews);
    nyhet.save(error => {
        if(CheckServerError(res, error)) return;
        res.status(201).json(nyhet);
        console.log('nyhet är skapad!');
    });
}

function putNews(req, res) {
    const id = parseInt(req.params.id, 10);
    const updateNyhet = {id: id, Title: req.body.Title, Innehall: req.body.Innehall};
    Nyhet.findOne({id: id}, (error, nyhet) =>{
        if(CheckServerError(res, error)) return;
        if(!CheckFound(res, nyhet)) return;

        nyhet.Title = updateNyhet.Title;
        nyhet.Innehall = updateNyhet.Innehall;
        nyhet.save(error => {
            if (CheckServerError(res, error)) return;
            res.status(200).json(nyhet);
            console.log('nyheten är nu skapad!');
        })
    });
}

function deleteNews(req, res) {
    const id = parseInt(req.params.id, 10);
    Nyhet.findOneAndRemove({ id: id})
    .then(nyhet => {
        if(!CheckFound(res, nyhet)) return;
        res.status(200).json(nyhet);
        console.log('nyhet är uppdaterad!');
    })
    .catch(error => {
        if (CheckServerError(res, error)) return;
    });
}

function CheckFound(res, nyhet){
    if(!nyhet) {
        res.status(404).send('finns ingen sådan nyhet!');
        return;
    }
    return nyhet;
}

function CheckServerError(res, error){
    if (error) {
        res.status(500).send(error);
        return error;
    }
}

module.exports = {
    getNyheter,
    postNews,
    putNews,
    deleteNews
}