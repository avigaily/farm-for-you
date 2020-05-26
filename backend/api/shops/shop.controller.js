
const shopService = require('./shop.service.js')


// const logger = require('../../services/logger.service')

// TODO: needs error handling! try, catch

async function getShops(req, res) {
    
    try {
        const shops = await shopService.query(req.query)
        res.send(shops)
    } catch (err) {
        // logger.error('Cannot get shops', err);
        res.status(500).send({ error: 'cannot get shops' })

    }
}
async function getShop(req, res) {
    console.log(req.params);
    
    const shop = await shopService.getById(req.params.id)
    console.log(shop);
    
    res.send(shop)
}
  
async function deleteShop(req, res) {
    try {
        await shopService.remove(req.params.id)
        res.end()
    } catch (err) {
        // logger.error('Cannot delete shop', err);
        res.status(500).send({ error: 'cannot delete shop' })
    }
}

async function addShop(req, res) {
    var shop = req.body;
    shop = await shopService.add(shop)
    res.send(shop)
}

module.exports = {
    getShops,
    deleteShop,
    addShop,
    getShop
}