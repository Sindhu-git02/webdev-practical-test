// Get HTML elements
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");
const filter = document.getElementById("filter");

// Store all expenses in an array
let expenses = [];

// Add expense
expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();
    const name = expenseName.value.trim();
    const expenseAmount = Number(amount.value);
    const expenseCategory = category.value;
    // Input validation
    if (name === "" || amount.value.trim() === "") {
   alert("Please fill all the fields!");
  return;
    }
    if (!Number.isFinite(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid positive amount!");  return;
    }
    // Create expense object
    const expense = {
        id: Date.now() + Math.random(),
 name: name,
  amount: expenseAmount,
  category: expenseCategory
    };
    // Add expense to array
    expenses.push(expense);

    // Update display
    displayExpenses();

    // Clear input fields
    expenseForm.reset();

});

// Display expenses
function displayExpenses() {

    expenseList.innerHTML = "";
 const selectedCategory = filter.value;

    // Filter expenses
    const filteredExpenses = expenses.filter(function(expense) {
        return selectedCategory === "All" ||
               expense.category === selectedCategory;
    });

    // Show message if no expenses exist
    if (filteredExpenses.length === 0) {
        expenseList.innerHTML =
            '<p class="empty-message">No expenses found!</p>';
    }

    // Display each expense
    filteredExpenses.forEach(function(expense) {

        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";

        const details = document.createElement("div");
        details.className = "expense-details";

        const name = document.createElement("h3");
        name.textContent = expense.name;

        const categoryText = document.createElement("p");
        categoryText.textContent = expense.category;

        details.appendChild(name);
        details.appendChild(categoryText);

        const rightSection = document.createElement("div");
        rightSection.className = "expense-right";

        const price = document.createElement("span");
        price.className = "expense-amount";
        price.textContent = "₹" + expense.amount.toFixed(2);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
 deleteButton.className = "delete-btn";
        // Delete expense
        deleteButton.addEventListener("click", function() {
  expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });
            displayExpenses();
        });
 rightSection.appendChild(price);
 rightSection.appendChild(deleteButton);
expenseItem.appendChild(details);
 expenseItem.appendChild(rightSection);
     expenseList.appendChild(expenseItem);
    });
    // Calculate total of ALL expenses
    const totalAmount = expenses.reduce(function(sum, expense) {
return sum + expense.amount;
    }, 0);
    total.textContent = "₹" + totalAmount.toFixed(2);
}
// Category filter
filter.addEventListener("change", displayExpenses);
