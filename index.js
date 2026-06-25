import rl from "readline-sync"
import { createCustomer,
    showCustomers,
    deposit,
    withdraw,
    searchCustomer,
    closeAccount,
    showStatistics} from "./service.js"

let choice;   
console.log("===== Welcome to the bank accouunt maneger =====");

do{
    console.log(`===== Menu =====
1. Create Customer
2. Show Customers
3. Deposit
4. Withdraw
5. Search Customer
6. Close Account
7. Show Statistics
0. Exit
`);

choice = rl.questionInt("Please enter your choice:");

switch(choice){
    case 0:{
        break;
    }
    case 1:{
        const fullName = rl.question("Enter full name: ");
        const accountType = rl.question("Enter account type Regular/Premium/Student: ");
        const initialBalance = rl.question("Enter initial balance: ");

        createCustomer(fullName, accountType, initialBalance);
        break;
    }

    case 2: {
        showCustomers();
        break;
    }

    case 3: {
        const customerId = rl.question("Enter customer ID: ");
        const amount = rl.question("Enter amount to deposit: ");

        deposit(customerId, amount);
        break;
    }

    case 4: {
        const customerId = rl.question("Enter customer ID: ");
        const amount = rl.question("Enter amount to withdraw: ");

        withdraw(customerId, amount);
        break;
    }

    case 5: {
        const customerId = rl.question("Enter customer ID: ");
        const customer = searchCustomer(customerId);

        if (customer) {
            console.log(customer);
        }

        break;
    }

    case 6: {
        const customerId = rl.question("Enter customer ID: ");

        closeAccount(customerId);
        break;
    }

    case 7: {
        showStatistics();
        break;
    }

    default: {
        console.log("Illegal option");
    }

}
}while (choice !== 0) 

console.log("Thank you for using the system!");
console.log("Goodbye!");