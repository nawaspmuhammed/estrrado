const express = require('express');
const app = express();
const productRoutes = express.Router();

let Product = require('../model/Product');

// api to add product
productRoutes.route('/add').post(function(req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({ 'status': 'success', 'mssg': 'Product added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'Unable to save to database' });
        });
});

// api to get products
productRoutes.route('/').get(function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'products': products });
        }
    });
});

// api to edit product
productRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'product': product });
        }
    });
});
// api to edit product
productRoutes.route('/getProduct/:id').get(function(req, res) {
    let name = req.params.id;
    console.log(name);
    Product.findOne({ name: name }, function(err, product) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'product': product });
        }
    });
});
// api to update route
productRoutes.route('/update/:id').post(function(req, res) {
    Product.findById(req.params.id, function(err, product) {

        if (!product) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            product.name = req.body.name;
            product.price = req.body.price;


            product.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
productRoutes.route('/delete/:id').get(function(req, res) {
    Product.findByIdAndRemove({ _id: req.params.id }, function(err, ) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = productRoutes;