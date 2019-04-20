const express = require('express');
const router = express.Router();
const { Url } = require('../models/url');
const useragent = require('useragent');

// :hash
router.get('/:hash', (req, res) => {
    let hash = req.params.hash;
    let agent = useragent.parse(req.headers['user-agent']);
    Url.findOneAndUpdate({hashedUrl: hash}, {$push: { clicks: { ip_address: req.ip, browser_name: agent.family,os_type: agent.os, device_type: agent.device}}}).then((url) => {
        res.redirect(url.original_url);
    }).catch((err) => {
        res.send(err);
    });
});


module.exports = {
    hashController: router
}