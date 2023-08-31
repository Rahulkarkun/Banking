class Transaction {
    static Id = 0
    constructor(date, amount, senderId, receiverId, typeOfTransaction, currentBalance) {
        this.transactionId = Transaction.Id++
        this.date = date
        this.amount = amount
        this.senderId = senderId
        this.receiverId = receiverId
        this.typeOfTransaction = typeOfTransaction
        this.currentBalance = currentBalance

    }

    static createTransaction(date, amount, senderid, receiverid, typeoftransaction, currentbalance) {
        return new Transaction(date, amount, senderid, receiverid, typeoftransaction, currentbalance)
    }



}

module.exports = Transaction