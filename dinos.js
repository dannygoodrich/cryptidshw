// mounted at '/dinos'

const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index - GET
router.get('/', (req, res) => {
    // get all dinos, pass to page
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos)
    

    res.render('dinos/index', { dinos: dinoData });
});

// New - GET
router.get('/new', (req, res) => {
    res.render('dinos/new');
});

// Create - Post
router.post('/', (req, res) => {
    console.log(req.body);
    // read dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    // JSON parse dinos
    let dinoData = JSON.parse(dinos);
    // add req.body to the end of dinos
    dinoData.push(req.body);
    // JSON stringify dinos
    let newDinos = JSON.stringify(dinoData);
    // write dinos
    fs.writeFileSync('./dinosaurs.json', newDinos);

    // todo redirect

    res.redirect(`/dinos/${dinoData.length -1}`);
})

// Show - Get
router.get('/:id', (req, res) => {
    // TODO get actual dino at id of req.params.id
    let dinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinoData[dinoIndex]
    oneDino.id = dinoIndex;

    res.render('dinos/show', { dino: oneDino });
});

// Edit - Get
router.get('/edit/:id', (req, res) => {
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinos[dinoIndex];
    oneDino.id = dinoIndex;
    res.render('dinos/edit', { dino: oneDino });
});

// Update - Put
router.put('/:id', (req, res) => {
    console.log('updating');
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    dinos[parseInt(req.params.id)] =req.body;
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    res.redirect(`/dinos/${req.params.id}`);
})

// Destroy - Delete
router.delete('/:id', (req, res) => {
    console.log(`deleting dino at ${req.params.id}`);
    // read dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    //JSON parse dinos
    dinos = JSON.parse(dinos);
    // remove dino from array at index
    let deadDino = dinos.splice(req.params.id, 1);
    // write JSON stringify dinos
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    console.log(`press f `)

    res.redirect('/dinos');
});

module.exports = router;