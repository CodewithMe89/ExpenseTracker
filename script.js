const titleInput = document.getElementById("titleInput");
const amountInput = document.getElementById("Money");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

// Load from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
renderExpenses();

// Add expense
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (title === "" || amount <= 0) return;

  expenses.push({ title, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  titleInput.value = "";
  amountInput.value = "";

  renderExpenses();
});

// Delete expense (event delegation)
expenseList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const index = e.target.dataset.index;
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }
});

// Render expenses
function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.title} - ₹${expense.amount}
      <button class="deleteBtn" data-index="${index}">X</button>
    `;
    expenseList.appendChild(li);
  });

  totalEl.innerText = total;
}
