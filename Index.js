//const Bank = require("./Bank")
const Customer = require("./Customer")

// let bank = new Bank(1,"state bank of india")
// console.log(Bank.abbreviation);
// console.log(Bank.bank);
let admin = Customer.createAdmin("Rahul","Karkun")
let user1 = admin.createCustomer("Amay","Shetty")
let user2 = admin.createCustomer("Utkarsh","Karkun")
console.log(admin.getAllCutomers());

// admin.updateCustomer(1,"LastName","Shetty")
// console.log(admin.getAllCutomers());
admin.createBank('State Bank Of India')
admin.createBank('Bank Of India')
console.log(admin.getAllBanks())
// console.log(admin.getAllBanks())
// admin.updateBank(0,"fullName","Bank Of India")
// console.log(admin.getAllBanks())
// admin.deleteBank(0)
// console.log(admin.getAllBanks())
user1.createAccount(0)
user1.createAccount(1)
console.log(user1.getAllAccount())
user2.createAccount(0)
console.log(user2.getAllAccount())
// user1.deleteAccount(0)
console.log(user1.getAllAccount())
user1.deposit(1, 2000)
console.log(user1.getAllAccount())
user1.withdraw(1, 500)
console.log(user1.getAllAccount())
user1.transferTo(500, 1, 2, 2)
console.log(user1.getAllAccount())
console.log(user2.getAllAccount())
// console.log(user1.passbook(1));
// console.log('================================================');
// console.log(user2.passbook(2));
// console.log(admin.getAllCutomers());








