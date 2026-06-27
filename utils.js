export let customers = []

export function createId(start = 1) {
    let id = start;

    function incId() {
        return id++;
    }

    return incId;
}

export function amountValidation(amount){
    
    amount = Number(amount);

    if (!Number.isFinite(amount) || amount <= 0) {
        return false;
    }

    return true;
}

export function idValidation(id){
    
    id = Number(id);

    if (!Number.isFinite(id)) {
            return false;
        }

    return true;    
}

export function returnCustomer(id){
    return customers.find(customer => customer.id == id);
}



export function setCustomers(newCustomers) {
    customers.length = 0;
    customers.push(...newCustomers);
}