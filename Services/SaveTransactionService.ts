import { Transaction } from "@/models/transaction";

export const saveTransaction = async(newTransaction: Transaction) : Promise<boolean> => {
    try{
        const response = await fetch("api/Transactions", {
        method: "POST", 
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newTransaction),
        });
        if(!response.ok){
            return false;
        }
        return true;
    }
    catch (error) {
        console.error("error during api call", error);
        return false;
    }    
}