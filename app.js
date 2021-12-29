const reasonInput = document.querySelector("#input-reason");
const amountInput = document.querySelector("#input-amount");
const cancelBtn = document.querySelector("#btn-cancel");
const confirmBtn = document.querySelector("#btn-confirm");
const expensesList = document.querySelector("#expenses-list");

const clear = () => {
  reasonInput.value = "";
  amountInput.value = "";
};

const confirmBtnSub = rxjs.fromEvent(confirmBtn, "click").subscribe((event) => {
  const enteredReason = reasonInput.value;
  const enteredAmount = amountInput.value;

  if (
    enteredReason.trim().length <= 0 ||
    enteredAmount <= 0 ||
    enteredAmount.trim().length <= 0
  ) {
    return;
  }

  console.log({ enteredReason, enteredAmount });

  const newItem = document.createElement("ion-item");
  newItem.textContent = `${enteredReason}: \$${enteredAmount}`;

  expensesList.appendChild(newItem);

  clear();
});

const cancelBtnSub = rxjs.fromEvent(cancelBtn, "click").subscribe(() => {
  clear();
});

document.addEventListener("close", () => {
  confirmBtnSub.unsubscribe();
  cancelBtnSub.unsubscribe();
});
