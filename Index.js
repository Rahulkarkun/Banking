const Customer = require("./Customer")

let admin = Customer.createAdmin("Rahul", "Karkun");
let customer1 = admin.createCustomer("John", "Doe");
let customer2 = admin.createCustomer("Alice", "Smith");
//admin.updateCustomer(1,"LastName","Shetty")
// console.log(admin.getAllCutomers());
//admin.deleteCustomer(1);
// console.log(admin.getAllCutomers());
console.log(Customer.allCustomers)
admin.createBank("State Bank Of India")
admin.createBank("Bank Of India")
console.log(admin.getAllBanks())
// admin.updateBank(0,"fullName","Bank Of China")
// console.log(admin.getAllBanks())
// admin.deleteBank(0)
// console.log(admin.getAllBanks())
customer1.createAccount(0);
customer1.createAccount(1);
customer2.createAccount(0);
console.log(customer1.getAllAccount());
console.log(customer2.getAllAccount());

customer1.deposit(0, 1000);
customer1.deposit(1, 1000);
customer2.deposit(2, 500);
customer1.withdraw(0, 200);
customer1.intraTransfer(0,1,300);
customer1.transfer(0, 2, 2, 400);
console.log("---------------------------");

const passbook = customer1.getPassBook(1);
const passbook1 = customer2.getPassBook(2);
console.log(passbook);
console.log(passbook1);

console.log(customer1.totalBalance())
console.log(customer2.totalBalance())










