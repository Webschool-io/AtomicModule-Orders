# AtomicModule-Orders

- Conceitos

Um pedido é onde inicia-se um processo em diversas empresas de vários ramos, um pedido tem sua data de criação se pegarmos todos os pedidos de um determinado dia temos a movimentação do dia. 

JSON
{
  produtos:[
  {
    id:Integer,
    qnt:Integer,
    desconto:Double
  }
  ],
  cond_pag: ['A-VISTA', 'BOLETO', 'CHEQUE'],
  status:['PAGO', 'AGUARDANDO', 'CANCELADO'],
  created_at:DATE,
  updated_at:DATE,
  end_entrega: {
    rua:String,
    bairro:String,
    cidade:String,
    cep:String,
    numero:Integer
  },
  end_cobranca: {
    rua:String,
    bairro:String,
    cidade:String,
    cep:String,
    numero:Integer
  },
  tipo_envio:[],
  valor_envio:Double,
  voucher: ?,
  desconto:Double,
  client:Schema.Types.ObjectId
  observacao:String,
  sub_total:Double,
  total:Double
}

vou implementar algo básico mais que funcione segue:

<i>model.js</i>
````
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
````


<i>route.js</i>
````
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
        var element = new Pedido(req.body);
        element.save(function(err,produto) {
            return callback.callbackSave(err,res);
        });
    };

    app.post('/api/addPedido',addPedido);
    app.delete('/api/removePedido',removePedido);
    app.get('/api/pedidos',buscaPedidos);
    app.get('/api/pedido/:id',buscaPedidoPorId);
}
````

<i>server.js</i>
````
// set up ===================================================================================================
var express        = require('express');
var morgan         = require('morgan');                         // log requests to the console (express4)
var bodyParser     = require('body-parser');                    // pull information from HTML POST (express4)
var methodOverride = require('method-override');                // simulate DELETE and PUT (express4)
var mongoose       = require('mongoose');                       // mongoose for mongodb
var app            = express();                                 // create our app w/ express
var port  	       = process.env.PORT || 3412; 				    // set the port


// configuration ============================================================================================
app.use(express.static(__dirname + '/public'));                 // set the static files location
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());                                      // simulate DELETE and PUT


// routes ===================================================================================================
var pedidosRoute = require('./route.js')(app);



// MongoDB configuration ====================================================================================

mongoose.connect('mongodb://localhost/dbOrders', function(err, res) {
	if (err) {
		console.log('error connecting to MongoDB Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});



// listen (start app with node server.js) ===================================================================
app.listen(port);
console.log('Listenning on port ' + port);
````

<i>um helper p o callback do express <b>callback-express</b></i>
````

````var obj = {

  callbackFind: (err,element,res) => {
    if(!err) {
      return res.send(element);
    }else {
      res.statusCode = 500;
      console.log("Erro interno!",res.statusCode,err.message);
      return res.send({error:"erro ao tentar buscar Elemento!"});
    }
  },

  callbackFindById: (err,element,res) => {
    if(!element) {
      res.statusCode = 404;
      return res.send({error:"Elemento não foi localizado"});
    }
    if(!err) {
      return res.send({status:"OK"});
    }
    else {
      res.statusCode = 500;
      console.log("Erro interno!",res.statusCode,err.message);
      return res.send({error:"erro ao tentar buscar"});
    }
  },

  callbackRemove: (err,res) => {
    if(!err) {
      console.log("Elemento removido com sucesso!");
      return res.send({status:"OK"});
    }
    else {
      res.statusCode = 500;
      console.log("Erro ao tentar remover",res.statusCode,err.message);
      return res.send({error:"erro no servidor"});
    }
  },

  callbackSave: (err,res) => {
    if(err) {
      console.log("Erro ao tentar salvar "+err);
      res.send({error:err});
    }
    else {
      console.log("Elemento cadastrado com sucesso!");
      res.send({status:"OK"});
    }
  }
  
};

module.exports = obj;