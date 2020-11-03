const express = require('express');
const app = express();
const orderRoutes = express.Router();

let Order = require('../model/Order');

// api to add order
orderRoutes.route('/add').post(function(req, res) {
    let order = new Order(req.body);
    let total_price = req.body.price * req.body.quantity;
    if (req.body.product == "Pepsi Cola" && req.body.quantity >= 3) {
        twenty_per = ((req.body.price * req.body.quantity) * 20) / 100;
        total_price = total_price - twenty_per;
    }

    order.created_at = new Date();
    order.total_price = total_price;
    order.save()
        .then(order => {
            res.status(200).json({ 'status': 'success', 'mssg': 'Order added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'Unable to save to database' });
        });
});

// api to get orders
orderRoutes.route('/').get(function(req, res) {
    Order.find(function(err, orders) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'orders': orders });
        }
    });
});

// api to edit order
orderRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    Order.findById(id, function(err, order) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'order': order });
        }
    });
});

// api to update route
orderRoutes.route('/update/:id').post(function(req, res) {
    Order.findById(req.params.id, function(err, order) {

        if (!order) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {


            let total_price = req.body.price * req.body.quantity;
            order.created_at = new Date();
            order.total_price = total_price;
            order.name = req.body.name;
            order.product = req.body.product;
            order.quantity = req.body.quantity;


            order.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
orderRoutes.route('/delete/:id').get(function(req, res) {
    Order.findByIdAndRemove({ _id: req.params.id }, function(err, ) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});
// api to search order
orderRoutes.route('/search/:id').get(function(req, res) {
    let name = req.params.id;

    var cond = {};
    if (req.params.id != "") {
        cond = {
            $or: [
                { name: { $regex: new RegExp(name, 'i') } },
                { product: { $regex: new RegExp(name, 'i') } },

            ]
        }

    }


    Order.find(cond,
        function(err, order) {
            if (err) {
                res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
            } else {
                res.status(200).json({ 'status': 'success', 'orders': order });
            }
        });
});
// api to search order
orderRoutes.route('/searchDate/:id/:user?').get(function(req, res) {
    let date_flag = req.params.id;
    let user = req.params.user;
    var cond = {};
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (date_flag != "") {
        if (date_flag == 2) {

            cond = {

                created_at: { $gte: startOfToday }

            }
        } else if (date_flag == 1) {

            var cutoff = now;
            cutoff.setDate(now.getDate() - 7);
            cond = {

                created_at: { '$gte': cutoff, '$lt': startOfToday }

            }
        }
    }
    conditions = {};
    if (user != "") {
        conditions = {
            $or: [
                { name: { $regex: new RegExp(user, 'i') } },
                { product: { $regex: new RegExp(user, 'i') } },

            ]
        }

    }
    var where_condition = {
        $and: [conditions,
            cond
        ]
    };


    Order.find(where_condition,
        function(err, order) {
            if (err) {
                res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
            } else {
                res.status(200).json({ 'status': 'success', 'orders': order });
            }
        });
});
module.exports = orderRoutes;