const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const molecule = {
    produtos: [{
        id: require('./../atoms/produtos_id'),
        qnt: require('./../atoms/produtos_qnt'),
        desconto: require('./../atoms/produtos_desconto')
    }],
    cond_pag: require('./../atoms/cond_pag'),
    status: require('./../atoms/status'),
    end_entrega: {
        rua: require('./../atoms/end_entrega_rua'),
        bairro: require('./../atoms/end_entrega_bairro'),
        cidade: require('./../atoms/end_entrega_cidade'),
        cep: require('./../atoms/end_entrega_cep'),
        numero: require('./../atoms/end_entrega_numero')
    },
    end_cobranca: {
        rua: require('./../atoms/end_cobranca_rua'),
        bairro: require('./../atoms/end_cobranca_bairro'),
        cidade: require('./../atoms/end_cobranca_cidade'),
        cep: require('./../atoms/end_cobranca_cep'),
        numero: require('./../atoms/end_cobranca_numero')
    },
    tipo_envio: require('./../atoms/tipo_envio'),
    valor_envio: require('./../atoms/valor_envio'),
    voucher: require('./../atoms/voucher'),
    desconto: require('./../atoms/desconto'),
    client: require('./../atoms/client'),
    observacao: require('./../atoms/observacao'),
    sub_total: require('./../atoms/sub_total'),
    total: require('./../atoms/total')
};

module.exports = new Schema(molecule);