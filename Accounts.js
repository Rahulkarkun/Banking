//account ke paas ek transaction ka list hoga
//account no hi account Id hai
const Transaction = require("./Transaction")
class Accounts 
{
    static accountNo = 0
    constructor(bankName, bankBalance) {
        this.accountNo = Accounts.accountNo++
        this.bankName = bankName
        this.bankBalance = bankBalance
        this.passbook = []
    }

    static createAccount(name, minTotalBalance) {
        return new Accounts(name, minTotalBalance)
    }

    createTransaction(date, amount, senderId, receiverId, typeOfTransaction, currentBalance) {
        try {
            if (typeof typeOfTransaction != 'string' && typeOfTransaction != 'deposit' && typeOfTransaction != 'withdraw' && typeOfTransaction != 'transfer') {
                throw new Error('Invalid transcation type')
            }
            if (typeof currentBalance < 0) {
                throw new Error('Insufficient Balance')
            }
            let transaction = Transaction.createTransaction(date, amount, senderId, receiverId, typeOfTransaction, currentBalance)

            return transaction
        } catch (error) {
            console.log(error.message);
        }
    }

    deposit(amount, accountNo) {

        this.bankBalance = this.bankBalance + amount
        let depositTransaction = this.createTransaction(new Date(), amount, accountNo, accountNo, 'deposit', this.bankBalance)
        this.passbook.push(depositTransaction)
    }

    withdraw(amount, accountNo) {
        if (this.bankBalance <= 1000) {
            throw new Error('cannot withdraw because your account should have balance greater than Rs 1000')
        }
        this.bankBalance = this.bankBalance - amount
        let withdrawTransaction = this.createTransaction(new Date(), amount, accountNo, accountNo, 'withdraw', this.bankBalance)
        this.passbook.push(withdrawTransaction)
    }
    
    send(amount, senderid, receiverid) {
        if (this.bankBalance <= 1000) {
            throw new Error('cannot transfer because your account should have balance greater than Rs 1000')
        }
        this.bankBalance = this.bankBalance - amount
        let transferTransaction = this.createTransaction(new Date(), amount, senderid, receiverid, 'transfer', this.bankBalance)
        this.passbook.push(transferTransaction)
    }

    receive(amount, senderid, receiverid) {
        this.bankBalance = this.bankBalance + amount
        let transferTransaction = this.createTransaction(new Date(), amount, senderid, receiverid, 'transfer', this.bankBalance)
        this.passbook.push(transferTransaction)
    }


    getpassbook() {
        return this.passbook
    }
}
module.exports = Accounts
