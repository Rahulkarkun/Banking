class Bank
{
    //newBank ka factory hoga idharpe
    static abbreviation = []
    static bank = []
    static bankID = 0
    constructor(fullName, Abbrevation)
    {
        this.bankId = Bank.bankID++
        this.fullName = fullName
        this.accounts = []
        this.Abbrevation = Abbrevation
        
        //this.abbreviation.push(this.fullName)
    }

    static createBank(fullName) {
        if (typeof fullName != 'string') {
            throw new Error('Invalid input')
        }
        let abbrevation = fullName.split(' ').map(x => x.charAt(0)).join('')
        let bank = new Bank(fullName, abbrevation)
        let newbank = Bank.bank.push(bank)
        return newbank
    }

    static getAllBanks() 
    {
        return this.bank
    }

    static #findBank(bankID) {
        for (let index = 0; index < Bank.bank.length; index++) {
            if (bankID == Bank.bank[index].bankId) {
                return [Bank.bank[index], index]
            }
        }
        return [null, -1]
    }

    static updateBank(bankID, parameter, newValue) 
    {
        if (bankID < 0 || typeof bankID != 'number') 
        {
            throw new Error("Invalid BankId")
        }
        let [foundBank, indexOfFoundBank] = Bank.#findBank(bankID)
        if (foundBank == null) 
        {
            throw new Error("Contact not found")
        }
        switch (parameter) 
        {
            case "fullName":
                foundBank.#updateFullName(newValue);
                break;
            default:
                break;
        }
            //foundBank.updateContact(parameter, newValue)
    } 

    #updateFullName(newValue) {
        if (typeof newValue != 'string') {
            throw new Error('Invalid new content')
        }
        this.fullName = newValue
        this.Abbrevation = newValue.split(' ').map(x => x.charAt(0)).join('')
    }

    static deleteBank(bankId) 
    {
        if (typeof bankId != 'number') {
            throw new Error('Invalid Input')
        }
        let [bankToBeDeleted, indexOfBankToBeDeleted] = this.#findBank(bankId)
        if (bankToBeDeleted == null) {
            throw new Error("User not found")
        }
        Bank.bank.splice(indexOfBankToBeDeleted, 1)
        return `${bankToBeDeleted.bankId} is Deleted successfully !!`
    }

    static createAccount(bankId) {
        if (typeof bankId != 'number') {
            throw new Error('Invalid bank id')
        }

        let [foundBank, getIndexOfBank] = Bank.#findBank(bankId)
        if (foundBank == null) {
            throw new Error('Bank id  not found')
        }

        return foundBank.fullName

    }
    
}
module.exports = Bank