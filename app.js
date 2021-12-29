const reasonInput = document.querySelector("#input-reason");
const amountInput = document.querySelector("#input-amount");
const cancelBtn = document.querySelector("#btn-cancel");
const confirmBtn = document.querySelector("#btn-confirm");
const expensesList = document.querySelector("#expenses-list");
const totalExpensesOutput = document.querySelector("#total-expenses");

// const alertCtrl = document.querySelector("ion-alert-controller");

let totalExpenses = 0;

const clear = () => {
  reasonInput.value = "";
  amountInput.value = "";
};

async function presentToast() {
  const toast = document.createElement("ion-toast");
  toast.message = "Expense is added!";
  toast.duration = 2000;

  document.body.appendChild(toast);
  return toast.present();
}

async function presentAlert(props) {
  const alert = document.createElement("ion-alert");
  // alert.cssClass = 'my-custom-class';
  alert.header = props.header;
  // alert.subHeader = 'Subtitle';
  alert.message = props.message;
  alert.buttons = props.buttons;

  document.body.appendChild(alert);
  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log("onDidDismiss resolved with role", role);
}

const confirmBtnSub = rxjs.fromEvent(confirmBtn, "click").subscribe((event) => {
  const enteredReason = reasonInput.value;
  const enteredAmount = amountInput.value;

  if (
    enteredReason.trim().length <= 0 ||
    enteredAmount <= 0 ||
    enteredAmount.trim().length <= 0
  ) {
    presentAlert({
      message: "Please enter a valid reason and amount!",
      header: "Invalid inputs",
      buttons: ["Okay"],
    });

    // alertCtrl
    //   .create({
    //     message: "Please enter a valid reason and amount!",
    //     header: "Invalid inputs",
    //     buttons: ["Okay"],
    //   })
    //   .then((alertElement) => {
    //     alertElement.present();
    //   });
    return;
  }

  console.log({ enteredReason, enteredAmount });

  const newItem = document.createElement("ion-item");
  newItem.textContent = `${enteredReason}: \$${enteredAmount}`;

  expensesList.appendChild(newItem);

  totalExpenses += +enteredAmount;
  totalExpensesOutput.textContent = totalExpenses;

  presentToast();

  clear();
});

const cancelBtnSub = rxjs.fromEvent(cancelBtn, "click").subscribe(() => {
  clear();
});

document.addEventListener("close", () => {
  confirmBtnSub.unsubscribe();
  cancelBtnSub.unsubscribe();
});
