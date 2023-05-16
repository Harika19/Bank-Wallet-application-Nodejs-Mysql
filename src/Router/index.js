const express = require('express')
const router  = express.Router()

const { DatabaseController, WalletController } = require('./../Controller/index')

router.get('/ping', (req, res) => {
    res.send(" SERVICE IS RUNINNG ")
})

// Database management
router.post('/create-database',     DatabaseController.createDatabase)
router.post('/create-table',        DatabaseController.createTables)

// Wallet management
router.post('/setup',               WalletController.createWallet)
router.post('/transact/:walletId',  WalletController.createTransaction)
router.get('/transactions',         WalletController.fetchTransactions);
router.get('/wallet/:id',           WalletController.fetchWalletById);

module.exports = router