const express = require('express');
const router = express.Router();
const Document = require('../models/document-model');

router.post('/documents', (req, res) => {
    const post = new Document({
        title: req.body.title,
        description: req.body.description,
        creation: new Date(),
        modification: new Date()
    });
    console.log(post);
    post.save((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                success: true,
                message: `Document with ID_${data._id} saved successfully!`
            })
        }
    })
})

router.get('/documents', (req, res) => {
    Document.find({}, 'title description creation modification', (err, documents) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({
                documents: documents
            })
        }
    }).sort({
        _id: -1
    })
})

router.get('/documents/:id', (req, res) => {
    Document.findById(req.params.id, 'title description creation modification', (err, document) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(document)
        }
    })
})

router.put('/posts/:id', (req, res) => {
    Document.findById(req.params.id, 'title description creation modification', (err, document) => {
        if (err) {
            console.log(err)
        } else {
            if (req.body.title) {
                document.title = req.body.title
            }
            if (req.body.description) {
                document.description = req.body.description
            }
            document.modification = new Date();
            document.save(err => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
});

router.delete('/documents/:id', (req, res) => {
    Document.remove({
        _id: req.params.id
    }, err => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

module.exports = router;