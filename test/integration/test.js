describe('Router Pedidos:', function() {

    describe('Route GET /api/pedidos',function() {

        it('deve retornar todos os pedidos do banco', function(done) {
            request
                .get('/api/pedidos')
                .end(function(err, res) {
                    console.log('resultado:',res.body);
                    done(err);
                })
        })
    })
})