describe('TEST integration para pedidos', function() {

    const Pedidos = require('../../beforeRefatoration');

var defaultPedido = { 
        [{
            id:1,
            qnt:100,
            desconto:100
        }],
        cond_pag:[],
        status:[],
        end_entrega: {
            rua:'teste',
            bairro:'teste',
            cidade:'teste',
            cep:'teste',
            numero:100
        },
        end_cobranca: {
            rua:'teste',
            bairro:'teste',
            cidade:'teste',
            cep:'teste',
            numero:100
        },
        tipo_envio:[],
        valor_envio:100,
        voucher:100,
        desconto:100,
        client:'teste',
        observacao:'teste',
        sub_total:100,
        total:100
    }

    beforeEach(function(done) {
        Pedidos.
            remove({},function(err){
                console.log(err);
            });
        Pedidos.Create(defaultPedido,function(err,dado) {
            console.log('dado');
        })
    });

    
}

