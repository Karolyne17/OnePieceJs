const express = require('express');
const path = require('path');
const Liste = require('./data/liste');

let app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Serveur Launch on Port : ${port}`)
});

// Configuration de express

const distDir = '../src/';
app.use('/pages', express.static(path.join(__dirname, distDir, '/pages')));
app.use('/assets', express.static(path.join(__dirname, distDir, '/assets')));
app.use('/favicons', express.static(path.join(__dirname, distDir, '/favicons')));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'index.html'));
});

app.get('/liste', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'pages/liste.html'));
});

app.get('/listePerso', (req, res) => {
    res.send(Liste);
});

app.post('/listePerso', (req, res) => {
    let newId = Liste.length > 0 ? Math.max(...(Liste.map(perso => { return perso.id }))) + 1 : 0;
    req.body.id = newId;
    Liste.push(req.body);
    res.send(Liste);
});

app.get('/addPerso', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'pages/addPersonnage.html'));
});

app.get('/details/:id', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'pages/details.html'));
});

app.get('/updatePerso/:id', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'pages/updatePersonnage.html'));
});

app.put('/updatePerso/:id', (req, res) => {
    let persoId = parseInt(req.params.id);
    let index = Liste.findIndex((perso) => perso.id === persoId);
    Liste.splice(index, 1, req.body);
    res.send(Liste);
});

app.get('/perso/:id', (req, res) => {
    let persoId = parseInt(req.params.id);
    let index = Liste.find((perso) => perso.id === persoId);
    res.send(index);
});

app.delete('/deletePerso/:id', (req, res) => {
    let persoId = parseInt(req.params.id);
    let index = Liste.findIndex((perso) => perso.id === persoId);
    if (index > -1) {
        Liste.splice(index, 1);
        res.send(Liste);
    } else {
        console.log('index non trouvé');
    }
})