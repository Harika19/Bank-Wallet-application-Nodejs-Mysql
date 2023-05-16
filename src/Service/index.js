const database = require('./../Models/index')

class WalletService {
    static async createWallet(balance, name) {
        try {
            const dbResponse = await database.insertWallet(balance, name)
            console.log(' [createWallet] DB RESPONSE: ', dbResponse)
            const response = {
                id: dbResponse.WALLET_ID,
                name: dbResponse.NAME,
                balance: dbResponse.BALANCE,
                createdDate: dbResponse.CREATION_DATE
            }
            return response
        } catch (error) {
            console.error(` [Service] Error in creating wallet `, error)
            throw error
        }
    }

    static async createTransaction(walletId, amount, description) {
        try {
            const dbResponse = await database.createTransaction(walletId, amount, description)
            console.log(' [createTransaction] DB RESPONSE: ', dbResponse)
            return dbResponse
        } catch (error) {
            console.error(` [Service] Error in creating wallet `, error)
            throw error
        }
    }

    static async fetchTransaction(walletId, skip, limit) {
        try {
            const dbResponse = await database.fetchTransactions(walletId, skip, limit)
            console.log(' [fetchTransaction] DB RESPONSE: ', dbResponse)
            return dbResponse
        } catch (error) {
            console.error(` [Service] Error in fetchTransaction `, error)
            throw error
        }
    }

    static async fetchWalletById(walletId) {
        try {
            const dbResponse = await database.fetchWalletById(walletId)
            console.log(' [fetchWalletById] DB RESPONSE: ', dbResponse)
            return dbResponse
        } catch (error) {
            console.error(` [Service] Error in fetchTransaction `, error)
            throw error
        }
    }
}

module.exports = WalletService