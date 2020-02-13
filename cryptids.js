const express = require('express');
const router = express.Router();
const fs = require('fs');


// Index - Get
router.get('/', (req, res) => {
    let allCryptids = fs.readFileSync('./cryptids.json');
    let cryptidsData = JSON.parse(allCryptids);

    //res.send('here');
    res.render('cryptids/index', { cryptids: cryptidsData });
});

router.get('/new', (req, res) => {
    res.render('cryptids/new');
});

// create - post
router.post('/', (req, res) => {
    let crps = fs.readFileSync('./cryptids.json');
    crps = JSON.parse(crps);
    crps.push(req.body);
    let newCryptids = JSON.stringify(crps);
    fs.writeFileSync('./cryptids.json', newCryptids);
    res.redirect(`/cryptids/${crps.length -1}`);
})

// show - get
router.get('/:id', (req, res) => {
    // TODO get actual dino at id of req.params.id
    let cryptids = fs.readFileSync('./cryptids.json');
    let cryptidData = JSON.parse(cryptids);
    let cryptidIndex = parseInt(req.params.id);
    let oneCryptid = cryptidData[cryptidIndex]
    oneCryptid.id = cryptidIndex;

    res.render('cryptids/show', { cryptid: oneCryptid });
});

// Edit - Get
router.get('/edit/:id', (req, res) => {
    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids);
    let cryptidIndex = parseInt(req.params.id);
    let onecryptid = cryptids[cryptidIndex];
    onecryptid.id = cryptidIndex;
    res.render('cryptids/edit', { cryptid: onecryptid });
});

router.put('/:id', (req, res) => {
    console.log('updating');
    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids);
    cryptids[parseInt(req.params.id)] =req.body;
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
    res.redirect(`/cryptids/${req.params.id}`);
})

router.delete('/:id', (req, res) => {
    console.log(`deleting cryptid at ${req.params.id}`);
    // read cryptids
    let cryptids = fs.readFileSync('./cryptids.json');
    //JSON parse cryptids
    cryptids = JSON.parse(cryptids);
    // remove cryptid from array at index
    let deadCryptid = cryptids.splice(req.params.id, 1);
    // write JSON stringify cryptids
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
    console.log(`press f `)

    res.redirect('/cryptids');
});














module.exports = router;