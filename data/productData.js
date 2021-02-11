const fs = require('fs/promises');
const path = require('path');
let productsDb = require('../config/products.json');


function getAll() {
    return productsDb;
}

function getProductById(id) {
    return productsDb.find(x => x.id == id);
}

function create(product) {
    // return save(product);
}


module.exports = {
    getAll,
    getProductById,
    create
}