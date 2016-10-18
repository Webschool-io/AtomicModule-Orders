'use strict';

var Pedidos = require('./model.js');
var callback = require('./callback-express.js');

module.exports = function(app) {

    var buscaPedidos = function(req, res) {
        console.log("buscaPedidos");

        return Pedidos.find(function(err, element) {
            callback.callbackFind(err,element,res);
        })
    };

    var buscaPedidoPorId = function(req, res) {
        console.log("buscaPedidoPorId");
        var id = req.params.id;
        return Pedidos.findById({_id:id},function (err, element){
            callback.callbackFindById(err,element,res);
        })
    };

    var removePedido = function(req, res) {
        console.log("removePedido");
        var id = req.params.id;
        return Pedidos.findById({id:id}, function(err, element) {
            if(!element) {
                res.statusCode = 404;
                return res.send({error:'Elemento não foi localizado'});
            }
            return Pedidos.removePedido(function(err) {
                callback.callbackRemove(err,res);
            });
        });
    };

    var addPedido = function(req, res) {
        console.log('addPedido');
        var element = new Pedidos(req.body);
        element.save(function(err,produto) {
            return callback.callbackSave(err,res);
        });
    };

    app.post('/api/addPedido',addPedido);
    app.delete('/api/removePedido',removePedido);
    app.get('/api/pedidos',buscaPedidos);
    app.get('/api/pedido/:id',buscaPedidoPorId);
}