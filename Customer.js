//accounts ka list 
//user ka list global
//create bank
//
const Bank = require("./Bank")
const Accounts = require("./Accounts")
class Customer
{
    static allCustomers = []
    static customerID = 0
    static mintotalBalance = 1000
    //isAdmin = false
    constructor(firstName,lastName,isAdmin)
    {
        this.account = []
        this.customerID = Customer.customerID++
        this.firstName = firstName
        this.lastName = lastName
        this.minTotalBalance = Customer.mintotalBalance
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

            const customer = new Customer(firstName, lastName, false)
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

        this.totalBalance = newValue
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
            return `${userToBeDeleted.id} is Deleted successfully !!`
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
            let account = Accounts.createAccount(bankFound, this.minTotalBalance)
            this.account.push(account)
            return account

        } catch (error) {
            throw new Error(error.message)
        }

    }

    getAllAccount() {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can view Account details')
            }
            return this.account
        } catch (error) {
            throw new Error(error.message)
        }
    }

    #findAccount(accountId) {
        for (let index = 0; index < this.account.length; index++) {
            if (accountId == this.account[index].accountNo) {
                return [this.account[index], index]
            }
        }
        return [null, -1]

    }

    deleteAccount(accountId) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can delete Account')
            }
            let [foundAccount, indexOfAccount] = this.#findAccount(accountId)
            if (foundAccount == null) {
                throw new Error('Account Not found')
            }
            this.account.splice(indexOfAccount, 1)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    deposit(accountNo, amount) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can deposit money')
            }
            if (typeof amount != 'number') {
                throw new Error('Amount entered should be strictly in numerics')
            }

            let [foundAccount, indexOfAccount] = this.#findAccount(accountNo)
            if (foundAccount == null) {
                throw new Error('Account Not found')
            }

            foundAccount.deposit(amount, accountNo)
        } catch (error) {
            throw new Error(error.message)

        }
    }

    withdraw(accountNo, amount) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can withdraw money')
            }
            if (typeof amount != 'number') {
                throw new Error('Amount entered should be strictly in numerics')
            }

            let [FoundAccount, indexofAccount] = this.#findAccount(accountNo)
            if (FoundAccount == null) {
                throw new Error('Account No not found')
            }

            FoundAccount.withdraw(amount, accountNo)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    transferTo(amount, accountIdOfSender, accountIdOfReceiver, custid) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can transfer money')
            }
            if (typeof amount != 'number') {
                throw new Error('Amount entered should be strictly in numerics')
            }

            let [FoundCustomer, indexofCustomer] = this.#findCustomer(custid)
            if (FoundCustomer == null) {
                throw new Error('Customer id not found')
            }

            let [SenderAccount, indexofsender] = this.#findAccount(accountIdOfSender)
            if (SenderAccount == null) {
                throw new Error('Sender Account No not found')
            }

            let [ReceiverAccount, indexofreceiver] = FoundCustomer.#findAccount(accountIdOfReceiver)
            if (ReceiverAccount == null) {
                throw new Error('Receiver Account No not found')
            }

            SenderAccount.send(amount, accountIdOfSender, accountIdOfReceiver)
            ReceiverAccount.receive(amount, accountIdOfSender, accountIdOfReceiver)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    passbook(accountNo) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can have access to passbook')
            }

            let [FoundAccount, indexofAccount] = this.#findAccount(accountNo)
            if (FoundAccount == null) {
                throw new Error('Account No not found')
            }
            let passbookdetails = FoundAccount.getpassbook()
            return passbookdetails


        } catch (error) {
            console.log(error.message);
        }
    }
    
}

module.exports = Customer