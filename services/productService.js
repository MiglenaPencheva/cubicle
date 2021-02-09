const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const fs = require('fs');
const path = require('path');
let productsDB = require('../config/products.json');

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
            data.difficultyLevel);

        productsDB.push(cube);

        fs.writeFile(__dirname + '/../config/products.json', JSON.stringify(productsDB), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create

}