const Cube = require('../models/Cube');

function getAll(query) {
    let products = Cube.find({}).lean();

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
    return Cube.findById(id).lean();
}

function create(data) {
    let cube = new Cube(data);
    return cube.save();
}

module.exports = {
    getAll,
    getProductById,
    create,
}