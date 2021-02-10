const fs = require('fs');
const path = require('path');
let productsDb = require('../config/products.json');


function getAll() {
    return productsDb;
}

function getProductById(id) {
    return productsDb.find(x => x.id == id);
}

function create(product) {
    productsDb.push(product);

    return fs.writeFile(
        path.join(__dirname, '../config/products.json'),
        JSON.stringify(productsDB)
    );
}


module.exports = {
    getAll,
    getProductById,
    create
}