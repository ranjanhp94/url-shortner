const express = require('express');
const router = express.Router();
const { Url } = require('../models/url');


// GET
router.get('/', (req, res) => {
    Url.find().then((urls) => {
        res.send(urls);
    }).catch((err) => {
        res.send(err);
    });
});




// POST
router.post('/', (req, res) => {
    let body = req.body;
    let url = new Url(body);
    url.save().then((url) => {
      res.send({
            url,
            notice: 'sucessful'
        })
    }).catch((err) =>{
        res.send(err);
    });
})

// update
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Url.findByIdAndUpdate({_id: id}, { $set : body }, { new: true, runValidators: true}).then((url) => {
        if(!url){
            res.send({
                notice: 'url not found'
            });
        }
        res.send({
            url,
            notice: 'updated url sucessfully'
        });
    });
});

// delete
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Url.findByIdAndRemove(id).then((url) => {
        if(url){
            res.send(url);
        } else {
            res.send({
                notice: 'url not found to delete'
            });
        }
    }).catch((err) => {
        res.send(err);
    });
});

//tags?names=[tag1,tag2]
router.get('/tags', (req, res) => {
    let tagName = req.query.names;
    console.log(tagName);
    tagName = tagName.split(',');
    Url.find({tags: { "$in": tagName }})
        .then((url) => {
            res.send(url);
        }).catch((err) => {
            res.send(err);
        });
});

// /tags/:name
router.get('/tags/:name', (req, res) => {
    let name = req.params.name;
        Url.find({tags: name}).then((url) => {
            res.send(url);
        }).catch((err) => {
            res.send(err);
        });
    });

// show one
router.get('/:id', (req, res) => {
let id = req.params.id;
Url.findById(id).then((url) => {
    res.send(url);
    });
});


module.exports = {
    urlsController: router
}