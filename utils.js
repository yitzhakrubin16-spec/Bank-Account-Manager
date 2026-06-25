export let customers = []

export function createId(){
    let Id = 1;
    function incId(){
        return Id++;

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

