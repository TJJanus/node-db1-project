const express = require('express')
const db = require('../data/dbConfig')
const router = express.Router()
// Base URL is /api/accounts

const Accounts = {
    getAll() {
        return db('accounts')
    },
    getById(id) {
        return db('accounts').where({ id }).first()
    },
    create(account) {
        return db('accounts').insert(account)
    }, 
    update(id, account) {
        return db('accounts').where({ id }).update(account)
    },
    delete(id) {
        return db('accounts').where({ id }).del()
    }
}


router.get('/', (req, res) => {
    Accounts.getAll()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json({ error: error.message})
        })
})

router.get('/:id', (req, res) => {
    Accounts.getById(req.params.id)
        .then(data => {
            res.json(data)
        })
})


router.post('/', (req, res) => {
    Accounts.create(req.body)
        .then(data => {
            res.json({data})
        })
        .catch(error => {
            res.json({error: error.message})
        })

})

router.put('/:id', async (req ,res) => {
    try {
        await Accounts.update(req.params.id, req.body)
        const updatedAccount = await Accounts.getById(req.params.id).first()
        res.json(updatedAccount)
    } catch (error) {
        res.json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedRowsNumber = await Accounts.delete(req.params.id)
        if (!deletedRowsNumber) {
            res.json({message: 'No account with given id'})
        } else {
            res.json({ message: 'Account deleted successfully'})
        }
        res.json(unknowThing)
    } catch (error) {
        res.json({ error: error.message })
    }
});

module.exports = router;