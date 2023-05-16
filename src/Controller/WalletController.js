const WalletService = require('./../Service/index')
const Errors        = require('./../Errors/index')
const { httpStatusCode } = require('./../constants')
const { OK, CREATED, BAD_REQUEST, NOT_FOUND }   = httpStatusCode

class WalletController {

    static async createWallet(req, res) {
        try {
            if (!req.body) {
                res.status(400).send({ message: "Request body cannot be empty" })
                return
            }
            if (!req.body.balance) {
                res.status(400).send({ message: "Balance is required" })
                return
            }
            if (!req.body.name) {
                res.status(400).send({ message: "Name is required" })
                return
            }

            const result = await WalletService.createWallet(req.body.balance, req.body.name)
            res.status(201).send({ message: result })
        } catch (error) {
            console.error(' Error in creating wallet : ', error);
            res.status(401).send({
                message: ' ERROR IN CREATION',
                error: error
            })
        }
    }

    static async createTransaction(req, res) {
        try{
            if(req?.params?.walletId 
                && req?.body?.amount 
                && req?.body?.description){
                const walletId      = req.params.walletId
                const amount        = Number(req.body.amount)
                const description   = req.body.description
    
                const response = await WalletService.createTransaction(walletId, amount, description)
                res.status(CREATED).json(response)
            }else{
                const errorResponse = []
    
                if(req.params.walletId === undefined){
                    errorResponse.push(Errors.WALLETID_MISSING)
                }
                if(req.body.amount === undefined){
                    errorResponse.push(Errors.AMOUNT_MISSING)
                }
                if(req.body.description === undefined){
                    errorResponse.push(Errors.DESCRIPTION_MISSING)
                }
    
                res.status(BAD_REQUEST).json({message: errorResponse})
            }
        } catch(error) {
            console.log('[Ctrl] Error in createTransaction: ', error)
            res.status(NOT_FOUND).send({message:error.message})
        }
    }

    static async fetchTransactions(req, res) {
        try{
            if(req?.query?.walletId){
                const walletId      = req.query.walletId
                const skip          = parseInt(req.query.skip) || 0; 
                const limit         = parseInt(req.query.limit) || 10;
    
                const response = await WalletService.fetchTransaction(walletId, skip, limit)
                res.status(CREATED).send(response)
            }else{
                const errorResponse = []
    
                if(req.params.walletId === undefined){
                    errorResponse.push(Errors.WALLETID_MISSING)
                }
                if(req.body.amount === undefined){
                    errorResponse.push(Errors.AMOUNT_MISSING)
                }
                if(req.body.description === undefined){
                    errorResponse.push(Errors.DESCRIPTION_MISSING)
                }
    
                res.status(BAD_REQUEST).send({message: errorResponse})
            }
        } catch(error) {
            console.log('[Ctrl] Error in fetchTransactions: ', error)
            res.status(NOT_FOUND).send({message:error.message})
        }
    }

    static async fetchWalletById(req, res) {
        try{
            if(req?.params?.id){
                const walletId = req.params.id
    
                const response = await WalletService.fetchWalletById(walletId)
                res.status(CREATED).send(response)
            }else{
                const errorResponse = []
    
                if(req.params.walletId === undefined){
                    errorResponse.push(Errors.WALLETID_MISSING)
                }    
                res.status(BAD_REQUEST).send({message: errorResponse})
            }
        } catch(error) {
            console.log('[Ctrl] Error in fetchWalletById: ', error)
            res.status(NOT_FOUND).send({message:error.message})
        }
    }
}

module.exports = WalletController