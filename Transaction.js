class Transaction
{
    constructor(sender,receiver,amount,type,timestamp)
    {
        this.sender = sender
        this.receiver = receiver
        this.amount = amount
        this.type = type
        this.time = timestamp
    }

    static makeTransaction(sender,receiver,amount,type,timestamp)
    {
        return new Transaction(sender,receiver,amount,type,timestamp)
    }
}
module.exports = Transaction