'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pedido = {

    produtos: [{
        id:Number,
        qnt:Number,
        desconto:Number
    }],
    cond_pag:[],
    status:[],
    end_entrega: {
        rua:String,
        bairro:String,
        cidade:String,
        cep:String,
        numero:Number
    },
    end_cobranca: {
        rua:String,
        bairro:String,
        cidade:String,
        cep:String,
        numero:Number
    },
    tipo_envio:[],
    valor_envio:Number,
    voucher:Number,
    desconto:Number,
    client:String,
    observacao:String,
    sub_total:Number,
    total:Number
}

const pedidoSchema = new Schema(pedido);
console.log('o Schema é :', pedidoSchema);
module.exports = mongoose.model('Pedido',pedidoSchema);