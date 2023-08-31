class Transaction {
    static Id = 0
    constructor(date, amount, accountIdOfSender, accountIdOfReceiver, typeOfTransaction, currentBalance) {
        this.transactionId = Transaction.Id++
        this.date = date
        this.amount = amount
        this.accountIdOfSender = accountIdOfSender
        this.accountIdOfReceiver = accountIdOfReceiver
        this.typeOfTransaction = typeOfTransaction
        this.currentBalance = currentBalance

    }

    static createTransaction(date, amount, accountIdOfSender, accountIdOfReceiver, typeoftransaction, currentbalance) {
        return new Transaction(date, amount, accountIdOfSender, accountIdOfReceiver, typeoftransaction, currentbalance)
    }



}

module.exports = Transaction