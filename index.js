let customers = []

function createId(){
    let Id = 1;
    function incId(){
        return Id++;

    }
    return incId;
}

const incId = createId();


function createCustomer(fullName, accountType, initialBalance) {
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
}
function showCustomers() {
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


function deposit(customerId, amount) {
    const id = Number(customerId);
    if (!Number.isFinite(id)) {
            console.log("Illegal customer ID");
            return;
        }
    
    const depositAmount = Number(amount);

    const customer = customers.find(customer => customer.id === id);

    if (!customer) {
        console.log("Deposit failed: Customer does not exist");
        return;
    }

    if (!customer.isActive) {
        console.log("Deposit failed: Customer is not active");
        return;
    }

    if (!Number.isFinite(depositAmount) || depositAmount <= 0) {
        console.log("Deposit failed: Illegal amount to deposit");
        return;
    }

    customer.balance += depositAmount;

    console.log("Deposit completed successfully");
}

function withdraw(customerId, amount) {
    const id = Number(customerId);
    
    if (!Number.isFinite(id)) {
            console.log("Illegal customer ID");
            return;
        }
    
    const withdrawAmount = Number(amount);

    const customer = customers.find(customer => customer.id === id);

    if (!customer) {
        console.log("Withdraw failed: Customer does not exist");
        return;
    }

    if (!customer.isActive) {
        console.log("Withdraw failed: Customer is not active");
        return;
    }

    if (!Number.isFinite(withdrawAmount) || withdrawAmount <= 0) {
        console.log("Withdraw failed: Illegal amount to withdraw");
        return;
    }

    if (withdrawAmount > customer.balance) {
        console.log("Withdraw failed: insufficient balance");
        return;
    }

    customer.balance -= withdrawAmount;

    console.log("Withdraw completed successfully");
}

function searchCustomer(customerId){
    const id = Number(customerId);
   
    if (!Number.isFinite(id)) {
            console.log("Illegal customer ID");
            return;
        }
    
    const customer = customers.find(customer => customer.id === id);

    

    if (!customer) {
        console.log("Customer search failed: Customer does not exist");
        return;
    }
    return customer;
}

function closeAccount(customerId){
    const id = Number(customerId);
   
    if (!Number.isFinite(id)) {
            console.log("Illegal customer ID");
            return;
        }
    
    const customer = customers.find(customer => customer.id === id);

    
    if (!customer) {
        console.log("Customer does not exist");
        return;
    }
    customer.isActive = false;
    console.log("Account closed successfully");
    return;

}
function showStatistics() {
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