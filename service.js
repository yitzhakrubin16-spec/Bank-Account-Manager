import {createId, 
    amountValidation, 
    customers, 
    idValidation, 
    returnCustomer} from "./utils.js"

const incId = createId();


export function createCustomer(fullName, accountType, initialBalance) {
    const validTypes = ["Regular", "Premium", "Student"];
    const balance = Number(initialBalance);

    if (fullName.trim() === "") {
        console.log("Illegal name");
        return;
    }

    if (!validTypes.includes(accountType)) {
        console.log("Illegal account type");
        return;
    }

    if (!Number.isFinite(balance) || balance < 0) {
    console.log("Entered Balance Illegal for initial account");
    return;
}

    const newCustomer = {
        id: incId(),
        fullName: fullName.trim(),
        accountType: accountType,
        balance: balance,
        isActive: true
    };

    customers.push(newCustomer);
    console.log("Customer created successfully");
    return newCustomer;
}


export function showCustomers() {
    console.log("===== Customers =====");

    const customersText = customers.map(customer => {
        return `Customer ID : ${customer.id}
Customer Name : ${customer.fullName}
Account Type : ${customer.accountType}
Balance : ${customer.balance}
Status : ${customer.isActive ? "Active" : "Not Active"}
--------------------`;
    });

    for (const text of customersText) {
        console.log(text);
    }
}


export function deposit(customerId, depositAmount) {
    
    if (!idValidation(customerId)) {
            console.log("Illegal customer ID");
            return;
        }

    const customer = returnCustomer(customerId);
    const amount = Number(depositAmount);    

    if (!customer) {
        console.log("Deposit failed: Customer does not exist");
        return;
    }

    if (!customer.isActive) {
        console.log("Deposit failed: Customer is not active");
        return;
    }

    if (!amountValidation(amount)) {
        console.log("Deposit failed: Illegal amount to deposit");
        return;
    }

    customer.balance += amount;

    console.log("Deposit completed successfully");
}

export function withdraw(customerId, withdrawAmount) {
    
    if (!idValidation(customerId)) {
            console.log("Illegal customer ID");
            return;
        }
    
    const customer = returnCustomer(customerId);
    const amount = Number(withdrawAmount);    
    
    if (!customer) {
        console.log("Withdraw failed: Customer does not exist");
        return;
    }

    if (!customer.isActive) {
        console.log("Withdraw failed: Customer is not active");
        return;
    }

    if (!amountValidation(amount)) {
        console.log("Withdraw failed: Illegal amount to withdraw");
        return;
    }

    if (amount > customer.balance) {
        console.log("Withdraw failed: insufficient balance");
        return;
    }

    customer.balance -= amount;

    console.log("Withdraw completed successfully");
}

export function searchCustomer(customerId){
    
    if (!idValidation(customerId)) {
            console.log("Illegal customer ID");
            return;
        }

    const customer = returnCustomer(customerId)
    
    if (!customer) {
        console.log("Customer search failed: Customer does not exist");
        return;
    }
    return customer;
}

export function closeAccount(customerId){
    if (!idValidation(customerId)) {
            console.log("Illegal customer ID");
            return;
        }
   
    const customer = returnCustomer(customerId)

    if (!customer) {
        console.log("Customer does not exist");
        return;
    }

    customer.isActive = false;
    console.log("Account closed successfully");
    return;

}


export function showStatistics() {
    const totalCustomers = customers.length;

    if (totalCustomers === 0) {
        console.log("===== Statistics =====");
        console.log("Total Customers: 0");
        console.log("Active Accounts: 0");
        console.log("Total Money: 0");
        console.log("Average Balance: 0");
        console.log("Highest Balance: 0");
        return;
    }

    const activeAccounts = customers.filter(customer => customer.isActive).length;

    const totalMoney = customers.reduce((acc, customer) => {
        return acc + customer.balance;
    }, 0);

    const averageBalance = totalMoney / totalCustomers;

    const highestBalance = customers.reduce((highest, customer) => {
        if (customer.balance > highest) {
            return customer.balance;
        }

        return highest;
    }, customers[0].balance);

    console.log("===== Statistics =====");
    console.log(`Total Customers: ${totalCustomers}`);
    console.log(`Active Accounts: ${activeAccounts}`);
    console.log(`Total Money: ${totalMoney}`);
    console.log(`Average Balance: ${averageBalance}`);
    console.log(`Highest Balance: ${highestBalance}`);
}


export function transferMoney(fromCustomerId, toCustomerId, transferAmount) {
    
    if (!idValidation(fromCustomerId) || !idValidation(toCustomerId)) {
        console.log("Transfer failed: Illegal customer ID");
        return;
    }

    if (Number(fromCustomerId) === Number(toCustomerId)) {
        console.log("Transfer failed: Cannot transfer to the same account");
        return;
    }

    const fromCustomer = returnCustomer(fromCustomerId);
    const toCustomer = returnCustomer(toCustomerId);
    const amount = Number(transferAmount);

    if (!fromCustomer || !toCustomer) {
        console.log("Transfer failed: Customer does not exist");
        return;
    }

    if (!fromCustomer.isActive || !toCustomer.isActive) {
        console.log("Transfer failed: One of the accounts is not active");
        return;
    }

    if (!amountValidation(amount)) {
        console.log("Transfer failed: Illegal amount to transfer");
        return;
    }

    if (amount > fromCustomer.balance) {
        console.log("Transfer failed: insufficient balance");
        return;
    }

    fromCustomer.balance -= amount;
    toCustomer.balance += amount;

    console.log("Transfer completed successfully");
}