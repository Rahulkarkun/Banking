//let { createAccount } = require("./Bank");
//let { minBalance } = require("./Customer");
let Transaction = require("./Transaction")
class Account
{
    static accountId = 0;
    
    constructor(bankName,minBalance)
    {
        this.bankName = bankName
        this.balance = minBalance
        this.id = Account.accountId++
        this.transaction = []
        //this.totalBalance = this.balance
    }

    static createAccount(bankName,minBalance)
    {
        let account = new Account(bankName,minBalance)
        return account
    }

    withdraw(amount, senderAccount, receiverAccount, timestamp) 
    {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Invalid withdrawal amount');
        }

        if (this.balance < amount) {
            throw new Error('Insufficient balance');
        }

        //let timestamp = new Date();
        let transaction = Transaction.makeTransaction(senderAccount, receiverAccount, -amount,"Debit",timestamp);
        this.transaction.push(transaction);
        this.balance -= amount;

        return transaction;
    }

    deposit(amount, senderAccount, receiverAccount, timestamp) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Invalid deposit amount');
        }
    
        // Create transaction record
        let formattedAmount = `+${amount}`;
        let transaction = Transaction.makeTransaction(senderAccount, receiverAccount, formattedAmount, 'Credit', timestamp);
    
        this.transaction.push(transaction);
        this.balance += amount;
    
        return transaction;
    }
    
    intraTransfer(receiverAccount, timestamp, amount) 
    {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Invalid transfer amount');
        }
    
        if (this.balance < amount) {
            throw new Error('Insufficient balance');
        }
    
        // Update balances
        this.balance -= amount;
        receiverAccount.balance += amount;
    
        // Create transaction records for both sender and receiver
        let senderTransaction = Transaction.makeTransaction(this.id, receiverAccount.id, -amount, 'Debit', timestamp);
        let formattedAmount = `+${amount}`;
        let receiverTransaction = Transaction.makeTransaction(this.id, receiverAccount.id, formattedAmount, 'Credit', timestamp);
    
        this.transaction.push(senderTransaction);
        receiverAccount.transaction.push(receiverTransaction);
    
        return senderTransaction;
    }
    
    
    

    transfer(targetAccount,amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Invalid transfer amount');
        }

        if (this.balance < amount) {
            throw new Error('Insufficient balance');
        }

        // if (targetAccount || !targetAccount instanceof Account) {
        //     throw new Error('Invalid target account');
        // }
        this.balance -= amount;
        targetAccount.balance += amount;

        let timestamp = new Date();
        let senderTransaction = Transaction.makeTransaction(this.id, targetAccount.id, -amount, 'Debit', timestamp);
        let formattedAmount = `+${amount}`;
        let receiverTransaction = Transaction.makeTransaction(this.id, targetAccount.id, formattedAmount, 'Credit', timestamp);
        this.transaction.push(senderTransaction);
        targetAccount.transaction.push(receiverTransaction);

        return senderTransaction;
    }

    getPassBook() {
        if (this.transaction.length === 0) {
            return `No transactions in passbook for Account ID ${this.id}\n`;
        }
    
        let passbook = `Passbook for Account ID ${this.id}:\n`;
    
        this.transaction.forEach((transaction, index) => {
            passbook += `${index + 1}. Transaction Type: ${transaction.type}\n`;
            passbook += `   Sender: ${transaction.sender}\n`;
            passbook += `   Receiver: ${transaction.receiver}\n`;
            passbook += `   Amount: ${transaction.amount}\n`;
            passbook += `   Timestamp: ${transaction.time}\n`;
            passbook += "\n";
        });
        
        return passbook+`Total Balance is ${this.balance}\n`;
    }
    
    
    
}
module.exports = Account