const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const route = require('./route');


const root = './';
const port = process.env.port || 3000;
const app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, './dist')));
app.use('./api', route);
app.get('*', (req, res) =>{
    res.sendfile('./dist/index.html', {root});
});

app.listen(port, () => console.log(`API running on localhost: ${port}`));