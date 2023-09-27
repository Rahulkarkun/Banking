//accounts ka list 
//user ka list global
//create bank
//
let Bank = require("./Bank")
let Account = require("./Account")
class Customer
{
    static allCustomers = []
    static customerID = 0
    static minBalance = 1000
    //isAdmin = false
    constructor(firstName,lastName,isAdmin)
    {
        this.accounts = []
        this.customerID = Customer.customerID++
        this.firstName = firstName
        this.lastName = lastName
        this.balance = Customer.minBalance
        this.isAdmin = isAdmin
    }

    static createAdmin(firstName,lastName)
    {
    try 
        {
            if (typeof firstName != 'string') 
            {
                throw new Error("Invalid name")
            }

            if (typeof lastName != 'string') 
            {
                throw new Error("Invalid number")
            }
            return new Customer(firstName, lastName, true)
        }
    catch (error) {
            console.log(error.message)
        }
    }

    createCustomer(firstName,lastName)
    {
        try 
        {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }

            if (typeof firstName != 'string') 
            {
                throw new Error("Invalid name")
            }

            if (typeof lastName != 'string') 
            {
                throw new Error("Invalid number")
            }

            let customer = new Customer(firstName, lastName, false)
            Customer.allCustomers.push(customer)
            return customer
        }
    catch (error) {
            console.log(error.message)
        }
    }

    getAllCutomers() {
        try {
            if (!this.isAdmin) {
                throw new Error("Not an Admin")
            }
        } catch (error) {
            console.log(error.message);
        }
        return Customer.allCustomers
    }

    #updateBalance(newValue) {
        try {
            if (typeof newValue != 'number') {
                throw new Error("Please enter a valid number")
            }
        } catch (error) {
            console.log(error.message)
        }

        this.balance = newValue
    }

    #findCustomer(userId) {
        try {
            if (typeof userId != 'number') {
                throw new Error("Invalid Id")
            }
            for (let index = 0; index <= Customer.allCustomers.length; index++) {
                if (userId == Customer.allCustomers[index].customerID) {
                    return [Customer.allCustomers[index], index]
                }
            }
        }
        catch (error) {
            console.log(error.message)
        }
        return [null, -1]
    }

    #updateFirstName(newValue) {
        try {
            if (typeof newValue != 'string') {
                throw new Error("Invalid name")
            }
        } catch (error) {
            console.log(error.message)
        }

        this.firstName = newValue
    }

    #updateLastName(newValue) {
        try {
            if (typeof newValue != 'string') {
                throw new Error("Invalid name")
            }
        } catch (error) {
            console.log(error.message)
        }

        this.lastName = newValue
    }

    updateCustomer(customerId, parameter, newValue) {
        try {
            if (!this.isAdmin) {
                throw new Error("Not an Admin")
            }
            let [customerToBeUpdated, indexOfcustomerToBeDeleted] = this.#findCustomer(customerId)
            //console.log("userToBeUpdated, indexOfUserToBeDeleted", userToBeUpdated, indexOfUserToBeDeleted)
            if (customerToBeUpdated == null) {
                throw new Error("User not found")
            }
            switch (parameter) {
                case 'FirstName':
                    customerToBeUpdated.#updateFirstName(newValue);
                    break;
                case 'LastName':
                    customerToBeUpdated.#updateLastName(newValue);
                    break;
                case 'Balance':
                    customerToBeUpdated.#updateBalance(newValue);
                    break;
                default:
                    throw new Error("No field found")
            }
            return customerToBeUpdated
        }
        catch (error) {
            console.log(error.message);
        }
    }

    deleteCustomer(customerId) {
        try {
            if (!this.isAdmin) {
                throw new Error("Not an Admin")
            }
            let [customerToBeDeleted, indexOfCustomerToBeDeleted] = this.#findCustomer(customerId)
            if (customerToBeDeleted == null) {
                throw new Error("User not found")
            }
            Customer.allCustomers.splice(indexOfCustomerToBeDeleted, 1)
            return `${customerToBeDeleted.id} is Deleted successfully !!`
        }
        catch (error) {
            console.log(error.message);
        }
    }

    createBank(fullname) {
        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            
            Bank.createBank(fullname)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    getAllBanks() {

        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }

            return Bank.getAllBanks()

        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateBank(bankID, parameter, newValue) {

        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            Bank.updateBank(bankID, parameter, newValue)
        } catch (error) {
            throw new Error(error.message)
        }

    }

    deleteBank(bankId) {
        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            Bank.deleteBank(bankId)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    createAccount(bankId) {
        try {
            if (this.isAdmin) {
                throw new Error('Only Customer can create Account')
            }
            let bankFound = Bank.createAccount(bankId)
            //console.log(bankFound)
            let account = Account.createAccount(bankFound, Customer.minBalance)
            //console.log(account)
            this.accounts.push(account)
            //return account

        } catch (error) {
            throw new Error(error.message)
        }

    }


    #findAccount(accountId)
    {
        for (let index = 0; index <= this.accounts.length; index++) {
            if (accountId == this.accounts[index].id) {
                return [this.accounts[index], index]
            }
        }
        return [null,-1]
    }

    deleteAccount(accountId)
    {
        if(typeof accountId != 'number')
        {
            throw new Error('Invalid Account Id')
        }
        
        let [accountToBeDeleted,indexOfAccounttoBeDeleted]=this.#findAccount(accountId)
        if(accountToBeDeleted == null)
        {
            throw new Error('Account not found')
        }
        this.accounts.splice(indexOfAccounttoBeDeleted,1)
        return `${accountId} is Deleted successfully !!`
    }

    getAllAccount()
    {
        return this.accounts
    }

    withdraw(accountId, amount) 
    {
        let [account, index] = this.#findAccount(accountId);
    
        if (account === null) {
            console.log(`Account with ID ${accountId} not found for customer ${this.firstName} ${this.lastName}`);
            throw new Error('Account not found');
        }
    
        let timestamp = new Date();
        let transaction = account.withdraw(amount, -1,accountId, timestamp); 
    
        return transaction;
    }

    deposit(accountId, amount) {
        let [account, index] = this.#findAccount(accountId);
    
        if (account === null) 
        {
            console.log(`Account with ID ${accountId} not found for customer ${this.firstName} ${this.lastName}`);
            throw new Error('Account not found');
        }
    
        let timestamp = new Date();
        let transaction = account.deposit(amount, -1, accountId, timestamp); // Pass 'this' as senderAccount and null as receiverAccount
    
        return transaction;
    }

    intraTransfer(senderAccountId, receiverAccountId, amount) {
        // Find the sender account
        let [senderAccount, indexOfSender] = this.#findAccount(senderAccountId);

        if (senderAccount === null) {
            throw new Error('Sender account not found');
        }

        // Find the receiver account
        let [receiverAccount, indexOfReceiver] = this.#findAccount(receiverAccountId);

        if (receiverAccount === null) {
            throw new Error('Receiver account not found');
        }

        // Perform the intra-account transfer by calling the Account class method
        let timestamp = new Date();
        let transaction = senderAccount.intraTransfer(receiverAccount, timestamp, amount);

        return transaction;
    }

    

    transfer(accountId, targetCustomerId, targetAccountId, amount) {
        //let [senderCustomer, senderCustomerIndex] = this.#findCustomer(customerId);
        let [receiverCustomer, receiverCustomerIndex] = this.#findCustomer(targetCustomerId);
        //console.log(receiverCustomer)

        if (receiverCustomer == null) {
            throw new Error('Sender or receiver customer not found');
        }

        let [senderAccount,senderAccountIndex] = this.#findAccount(accountId);
        let [receiverAccount,receiverAccountIndex] = receiverCustomer.#findAccount(targetAccountId);

        if (senderAccount == null || receiverAccount == null) {
            throw new Error('Sender or receiver account not found');
        }

        let transaction = senderAccount.transfer(receiverAccount,amount);
        return transaction;
    }

    getPassBook(customerId) {
        // Find the customer
        let [customer, customerIndex] = this.#findCustomer(customerId);
    
        if (customer == null) {
            throw new Error('Customer not found');
        }
    
        let passbook = `Passbook for ${customer.firstName} ${customer.lastName}:\n`;
    
        // Loop through all accounts of the customer
        for (let account of customer.accounts) {
            passbook += `Account ID: ${account.id}\n`;
    
            // Get the passbook for the account by calling its getPassBook method
            let accountPassbook = account.getPassBook();
            passbook += accountPassbook;
    
            passbook += '\n';
        }
    
        return passbook;
    }
    
    totalBalance()
    {
        try {
            let totalBalance = 0
            
            for (let index = 0; index < this.accounts.length; index++) {
                totalBalance = totalBalance + this.accounts[index].balance
                
            }
            return `Total Balance of Customer ${this.customerID} is: ${totalBalance}`

        } catch (error) {
            throw new Error(error.message)
        }
    }
    
}

module.exports = Customer