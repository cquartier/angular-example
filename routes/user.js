/*
 * user routes.
 */
var _ = require('underscore');

var users = [
    {
        id: 1,
        firstName: 'Bob',
        lastName: 'Smith',
        department: 'Sales'
    },
    {
        id: 2,
        firstName: 'Joe',
        lastName: 'Winters',
        department: 'Accounting'
    },
    {
        id: 3,
        firstName: 'Susan',
        lastName: 'Barnes',
        department: 'Sales'
    }
];

var curId = 4;

exports.listAll = function(req, res){
    res.json(users);
};

exports.findById = function(req, res){
    res.json(_.findWhere(users, {id: req.params.id}));
}

exports.create = function(req, res){
    console.log(req.body);
    var user = _.extend({id: curId++}, req.body.user);
    users.push(user);
    res.json(user);
};

