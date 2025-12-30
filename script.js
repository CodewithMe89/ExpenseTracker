
const titleInput = document.getElementById("titleInput");
const amountInput = document.getElementById("Money");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");
const categoryInput = document.getElementById("categoryInput");
const filterCategory = document.getElementById("filterCategory")

// Load from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let currentFilter = "All";
renderExpenses();

// Add expense
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (title === "" || amount <= 0) return;

  expenses.push({ id: Date.now(),title, amount, category:categoryInput.value });

  localStorage.setItem("expenses", JSON.stringify(expenses));

  titleInput.value = "";
  amountInput.value = "";

  renderExpenses();
});

//Filter Change
filterCategory.addEventListener("change",()=>{
    currentFilter = filterCategory.value;
    renderExpenses();
})

// Delete expense (event delegation)
expenseList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = Number(e.target.dataset.id);
    expenses = expenses.filter(exp=> exp.id !== id)
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }
});

// Render expenses
// function renderExpenses() {
//   expenseList.innerHTML = "";
//   let total = 0;

//   expenses.forEach((expense, index) => {
//     total += expense.amount;

//     const li = document.createElement("li");
//     li.innerHTML = `
//     <span>${expense.title} (${expense.category})</span>
//       ${expense.title} - ₹${expense.amount}
//       <button class="deleteBtn" data-index="${index}">X</button>
//     `;
//     expenseList.appendChild(li);
//   });

//   totalEl.innerText = total;
// }
function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  const filteredExpenses =
    currentFilter === "All"
      ? expenses
      : expenses.filter(exp => exp.category === currentFilter);

  filteredExpenses.forEach(expense => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${expense.title} (${expense.category})</span>
      <span>₹${expense.amount}</span>
      <button class="deleteBtn" data-id="${expense.id}">X</button>
    `;
    expenseList.appendChild(li);
  });

  totalEl.innerText = total;
}