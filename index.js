class AtmMachine {
  constructor(root) {
    this.balance = 0;

    this.atmContainer = document.createElement("div");
    this.atmContainer.classList.add("atm-container");

    this.header = document.createElement("h1");
    this.header.textContent = "ATM Machine";

    this.balanceButton = document.createElement("button");
    this.balanceButton.textContent = "Get Balance";
    this.balanceButton.addEventListener("click", () => {
      this.updateMenu(this.balanceMenu);
      this.getBalance();
    });

    this.depositButton = document.createElement("button");
    this.depositButton.textContent = "Deposit";
    this.depositButton.addEventListener("click", () => {
      this.updateMenu(this.depositMenu);
      this.setDepositMessage("");
      this.depositInput.value = "";
    });

    this.withdrawButton = document.createElement("button");
    this.withdrawButton.textContent = "Withdraw";
    this.withdrawButton.addEventListener("click", () => {
      this.updateMenu(this.withdrawMenu);
      this.setWithdrawMessage("");
      this.withdrawInput.value = "";
    });

    this.exitButton = document.createElement("button");
    this.exitButton.textContent = "Exit";
    this.exitButton.addEventListener("click", () => {
      this.atmContainer.removeChild(this.buttonContainer);
      this.atmContainer.removeChild(this.menuContainer);
      this.header.textContent = "Goodbye!";
    });

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.classList.add("button-container");
    this.buttonContainer.appendChild(this.balanceButton);
    this.buttonContainer.appendChild(this.depositButton);
    this.buttonContainer.appendChild(this.withdrawButton);
    this.buttonContainer.appendChild(this.exitButton);

    this.menuContainer = document.createElement("div");
    this.menuContainer.classList.add("menu-container");
    this.welcomeText = document.createTextNode(
      "Welcome to the bank of JavaScript! Click on one of the menu options above."
    );
    this.menuContainer.appendChild(this.welcomeText);
    this.currentMenu = this.welcomeText;

    this.balanceMenu = document.createTextNode("");

    // Deposit menu

    this.depositMenu = document.createElement("div");
    this.depositMenu.classList.add("deposit-menu");

    const depositForm = document.createElement("div");
    depositForm.classList.add("number-form");
    this.depositMenu.appendChild(depositForm);

    const depositPrompt = document.createElement("label");
    depositPrompt.textContent = "Deposit Amount";
    depositPrompt.HTMLFor = "deposit";

    const depositInput = document.createElement("input");
    depositInput.name = "deposit";
    depositInput.type = "text";
    this.depositInput = depositInput;

    const depositSubmit = document.createElement("button");
    depositSubmit.textContent = "Submit";
    depositSubmit.addEventListener("click", () => this.deposit());

    depositForm.appendChild(depositPrompt);
    depositForm.appendChild(depositInput);
    depositForm.appendChild(depositSubmit);

    this.depositMessage = document.createElement("p");
    this.depositMenu.appendChild(this.depositMessage);

    // Withdraw menu

    this.withdrawMenu = document.createElement("div");
    this.withdrawMenu.classList.add("withdraw-menu");

    const withdrawForm = document.createElement("div");
    withdrawForm.classList.add("number-form");
    this.withdrawMenu.appendChild(withdrawForm);

    const withdrawPrompt = document.createElement("label");
    withdrawPrompt.textContent = "Withdraw Amount";
    withdrawPrompt.HTMLFor = "withdraw";

    const withdrawInput = document.createElement("input");
    withdrawInput.name = "withdraw";
    withdrawInput.type = "text";
    this.withdrawInput = withdrawInput;

    const withdrawSubmit = document.createElement("button");
    withdrawSubmit.textContent = "Submit";
    withdrawSubmit.addEventListener("click", () => this.withdraw());

    withdrawForm.appendChild(withdrawPrompt);
    withdrawForm.appendChild(withdrawInput);
    withdrawForm.appendChild(withdrawSubmit);

    this.withdrawMessage = document.createElement("p");
    this.withdrawMenu.appendChild(this.withdrawMessage);

    this.atmContainer.appendChild(this.header);
    this.atmContainer.appendChild(this.buttonContainer);
    this.atmContainer.appendChild(this.menuContainer);

    root.appendChild(this.atmContainer);
  }

  deposit() {
    let amount = this.depositInput.value;

    if (amount.trim() === "") {
      this.setDepositMessage("Enter the amount you want to deposit");
      return;
    }

    amount = Number(amount);
    if (isNaN(amount)) {
      this.setDepositMessage("Not a number");
    } else if (amount < 0) {
      this.setDepositMessage("Amount cannot be negative");
    } else {
      this.balance += amount;
      this.setDepositMessage(`You deposited $${amount}`);
    }
  }

  setDepositMessage(message) {
    this.depositMessage.textContent = message;
  }

  withdraw() {
    let amount = this.withdrawInput.value;
    if (amount.trim() === "") {
      this.setWithdrawMessage("Enter the amount you want to withdraw");
      return;
    }

    amount = Number(amount);
    if (isNaN(amount)) {
      this.setWithdrawMessage("Not a number");
    } else if (amount < 0) {
      this.setWithdrawMessage("Amount cannot be negative");
    } else if (this.balance - amount < 0) {
      this.setWithdrawMessage("Not enough funds");
    } else {
      this.balance -= amount;
      this.setWithdrawMessage(`You withdrew $${amount}`);
    }
  }

  setWithdrawMessage(message) {
    this.withdrawMessage.textContent = message;
  }

  getBalance() {
    this.balanceMenu.textContent = `Your current balance is $${this.balance}`;
  }

  updateMenu(newMenu) {
    this.menuContainer.replaceChild(newMenu, this.currentMenu);
    this.currentMenu = newMenu;
  }
}

new AtmMachine(document.body);
