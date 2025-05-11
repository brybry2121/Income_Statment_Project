// Initialize State Variables
let totalRevenue = 0;
let beginningInventory = 0;
let purchases = 0;
let endingInventory = 0;
let totalCogs = 0;
let totalExpenses = 0;
let totalTaxes = 0;

// DOM Elements
const signInButton = document.getElementById('sign-in');
const signOutButton = document.getElementById('sign-out');
const revenueForm = document.getElementById('revenue-form');
const revenueList = document.getElementById('revenue-list');
const totalRevenueElement = document.getElementById('total-revenue');
const cogsForm = document.getElementById('cogs-form');
const cogsList = document.getElementById('cogs-list');
const totalCogsElement = document.getElementById('total-cogs');
const expensesForm = document.getElementById('expenses-form');
const expensesList = document.getElementById('expenses-list');
const totalExpensesElement = document.getElementById('total-expenses');
const taxForm = document.getElementById('tax-form');
const taxList = document.getElementById('tax-list');
const totalTaxElement = document.getElementById('total-tax');
const summaryTotalRevenue = document.getElementById('summary-total-revenue');
const summaryTotalCogs = document.getElementById('summary-total-cogs');
const summaryGrossMargin = document.getElementById('summary-gross-margin');
const summaryTotalExpenses = document.getElementById('summary-total-expenses');
const summaryTotalTax = document.getElementById('summary-total-tax');
const summaryNetIncome = document.getElementById('summary-net-income');

// Authentication Handlers
function handleSignIn() {
  alert('Sign-In Successful!');
  signInButton.disabled = true;
  signOutButton.disabled = false;
}

function handleSignOut() {
  alert('Sign-Out Successful!');
  signInButton.disabled = false;
  signOutButton.disabled = true;
}

// Add Item to List and Update Totals
function addItemToList(form, list, updateCallback) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const itemNameInput = form.querySelector('input[type="text"]');
    const itemAmountInput = form.querySelector('input[type="number"]');
    const itemName = itemNameInput.value;
    const itemAmount = parseFloat(itemAmountInput.value);

    if (!itemName || isNaN(itemAmount) || itemAmount <= 0) {
      alert('Please enter a valid name and amount.');
      return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${itemName}:</span><span>$${itemAmount.toFixed(2)}</span>`;
    list.appendChild(listItem);

    updateCallback(itemName, itemAmount);

    itemNameInput.value = '';
    itemAmountInput.value = '';
  });
}

// Update Total Revenue
function updateTotalRevenue(itemName, amount) {
  totalRevenue += amount;
  totalRevenueElement.textContent = totalRevenue.toFixed(2);
  updateSummary();
}

// Update Total COGS
function updateTotalCogs(itemName, amount) {
  if (itemName.toLowerCase().includes('beginning')) {
    beginningInventory = amount;
  } else if (itemName.toLowerCase().includes('purchase')) {
    purchases = amount;
  } else if (itemName.toLowerCase().includes('ending')) {
    endingInventory = amount;
  }
  totalCogs = beginningInventory + purchases - endingInventory;
  totalCogsElement.textContent = totalCogs.toFixed(2);
  updateSummary();
}

// Update Total Expenses
function updateTotalExpenses(itemName, amount) {
  totalExpenses += amount;
  totalExpensesElement.textContent = totalExpenses.toFixed(2);
  updateSummary();
}

// Update Total Taxes
function updateTotalTaxes(itemName, percentage) {
  const taxableIncome = totalRevenue - totalCogs - totalExpenses;
  const taxAmount = (taxableIncome * percentage) / 100;
  totalTaxes += taxAmount;
  totalTaxElement.textContent = totalTaxes.toFixed(2);
  updateSummary();
}

// Update Summary
function updateSummary() {
  const grossMargin = totalRevenue - totalCogs;
  const netIncome = grossMargin - totalExpenses - totalTaxes;

  summaryTotalRevenue.textContent = totalRevenue.toFixed(2);
  summaryTotalCogs.textContent = totalCogs.toFixed(2);
  summaryGrossMargin.textContent = grossMargin.toFixed(2);
  summaryTotalExpenses.textContent = totalExpenses.toFixed(2);
  summaryTotalTax.textContent = totalTaxes.toFixed(2);
  summaryNetIncome.textContent = netIncome.toFixed(2);
}

// Attach Event Listeners
signInButton.addEventListener('click', handleSignIn);
signOutButton.addEventListener('click', handleSignOut);
addItemToList(revenueForm, revenueList, updateTotalRevenue);
addItemToList(cogsForm, cogsList, updateTotalCogs);
addItemToList(expensesForm, expensesList, updateTotalExpenses);
addItemToList(taxForm, taxList, updateTotalTaxes);