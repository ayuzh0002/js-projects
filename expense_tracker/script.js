console.log('hello')

const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions=JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit",addTransaction)

function addTransaction(e){
    e.preventDefault();

    //get form values
    const description=descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push({
        id:Date.now(),
        description,
        amount,
    });

    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionsList();
    //updateSummary();

    transactionFormEl.reset();
}

function updateTransactionsList(){
    transactionListEl.innerHTML='';

    const sortedTransactions=[...transactions].reverse()

    sortedTransactions.forEach((transaction)=>{
        const transactionEL=createTransactionELement(transaction);
        transactionListEl.appendChild(transactionEL);
    });
}

function createTransactionELement(transaction){
    const li=document.createElement("li");
        li.classList.add("transactions");
        li.classList.add(transaction.amount>0 ? "income":"expense");
        //todo update the amount formatting
        li.innerHTML=
        `
        <span>${transaction.description}</span>
        <span>${transaction.amount}
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
        </span>
        `

        return li
}