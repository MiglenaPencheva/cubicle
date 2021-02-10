const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const productData = require('../data/productData');

function getAll(query) {
    let products = productData.getAll();

    console.log(products);
    console.log(query);
    console.log(query.search);

    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if (query.from) {
        products = products.filter(x => Number(x.level) >= query.from);
    }
    if (query.to) {
        products = products.filter(x => Number(x.level) <= query.to);
    }

    return products;
}

function getProductById(id) {
    return productData.getProductById(id);
}

function create(data) {
    try {
        if (data.name === '') {
            throw new Error('Name is required');
        }
        if (data.description === '') {
            throw new Error('Description is required');
        }
        if (data.level < 1 || data.level > 6) {
            throw new Error('Dificulty Level is required');
        }
        if (data.imageUrl === '') {
            throw new Error('Image is required');
        }
        if (data.imageUrl.slice(0, 7) != 'http://' && data.imageUrl.slice(0, 8) != 'https://') {
            throw new Error('Invalid image URL');
        }

        let cube = new Cube(
            uniqid(),
            data.name,
            data.description,
            data.imageUrl,
            data.difficultyLevel
        );

        return productData.create(cube);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAll,
    getProductById,
    create,
}