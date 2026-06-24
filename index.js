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

function showCustomers(){
    console.log("===== Customers =====");
    
    for (const customer of customers){
        console.log(`Customer ID : ${customer.id}`);
        console.log(`Customer Name : ${customer.fullName}`);
        console.log(`Account Type : ${customer.accountType}`);
        console.log(`Balance : ${customer.balance}`);
        if(customer.isActive){console.log(`Status : Active`);}
        else {console.log(`Status : Not Active`);}  
    }
}


function deposit(customerId, amount) {
    const id = Number(customerId);
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