const express = require('express');
const router = express.Router();
const Data = require('../data/get-https-response');
let path1, path2, path
//register user
router.get('/price', async (req, res) => {

    try {
       
        path1 = '/data/pricemultifull?'
        path2 = req.url.split('?')[1]
        path = path1 + '&' + path2
        let result = await Data.getData(path,req.query)
        res.send(result);

    } catch (error) {
        res.status(400).send(error)
    }

});


module.exports = router;