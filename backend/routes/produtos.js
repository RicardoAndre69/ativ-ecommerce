const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorn todos os pedidos'
    });
});

router.post('/', (req,res,next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };
    res.status(201).send({
        mensagem: 'Insere um produto'
    })
});



router.get('/:id_produto', (req,res,next) => {
    const id = req.params.id_produto

    if( id === 'especial') {
        res.status(200).send({
            mensagem: 'Você descobriu o ID especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'Você passou um ID'
        });
    }
})

router.patch('/', (req,res,next) => {
    res.status(201).send({
        mensagem: 'produto alterado'
    })
});

router.delete('/', (req,res,next) => {
    res.status(201).send({
        mensagem: 'produto excluído'
    })
});

module.exports = router;